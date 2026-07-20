import { useCallback, useEffect, useState } from "react";
import SuggestedPrompts from "../SuggestedPrompts";
import ChatInput from "../ChatInput";
import { useAuth } from "@/hooks/useAuth";
import {
  createConversation as createConversationApi,
  getConversations,
  getConversation,
} from "@/services/conversation";

interface ChatMessage {
  id: string;
  content: string;
  role: "USER" | "ASSISTANT";
}

const ChatWindow = () => {
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null); // Track error messages

  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const firstName = user?.fullName.split(" ")[0];

  const initializeChat = useCallback(async () => {
    try {
      const data = await getConversations();

      if (data.success && data.conversations?.length > 0) {
        const latestConversation = data.conversations[0];
        setConversationId(latestConversation.id);

        const conversation = await getConversation(latestConversation.id);
        if (conversation.success) {
          setMessages(conversation.conversation.messages);
        }
        return;
      }

      const created = await createConversationApi();
      if (created.success && created.conversation?.id) {
        setConversationId(created.conversation.id);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const timeoutId = window.setTimeout(() => {
      if (isMounted) void initializeChat();
    }, 0);

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, [initializeChat]);

  const handleSend = async (content: string) => {
    if (!conversationId) return;

    setErrorText(null); // Clear any old errors
    const token = localStorage.getItem("token");

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content,
      role: "USER",
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            conversationId,
            content,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send message.");
      }

      setMessages((prev) => [...prev, data.assistantMessage]);
    } catch (error: unknown) {
  console.error(error);

  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong. Please try again.";

  setErrorText(message);
} finally {
  setLoading(false);
}
  };

  return (
    <section className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="text-center text-4xl font-bold tracking-tight text-white">
              {user ? `${greeting}, ${firstName}` : "Welcome to Nuci"}
            </h1>

            <p className="mt-5 mb-12 max-w-2xl text-center text-lg leading-8 text-zinc-400">
              How may I help you today?
            </p>

            <SuggestedPrompts />
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-sm ${
                  message.role === "USER"
                    ? "ml-auto bg-cyan-600 text-white"
                    : "mr-auto border border-zinc-800 bg-zinc-900 text-white"
                }`}
              >
                {/* Note: Replace this text container with a markdown library like react-markdown later */}
                <span className="whitespace-pre-wrap">{message.content}</span>
              </div>
            ))}

            {loading && (
              <div className="mr-auto rounded-3xl border border-zinc-800 bg-zinc-900 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></span>
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: "0.15s" }}
                  ></span>
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: "0.3s" }}
                  ></span>
                </div>
              </div>
            )}

            {errorText && (
              <div className="mx-auto rounded-xl bg-red-950/50 border border-red-900 px-4 py-2 text-sm text-red-400">
                {errorText}
              </div>
            )}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} />
    </section>
  );
};

export default ChatWindow;
