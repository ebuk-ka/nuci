import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

import ChatInput from "../ChatInput";
import SuggestedPrompts from "../SuggestedPrompts"; 

import MessageBubble from "../bubbles/MessageBubbles";
import TypingIndicator from "../Indicators/TypingIndicator";
import { sendMessage } from "@/services/message";

import {
  createConversation as createConversationApi,
  getConversation,
  getConversations,
} from "@/services/conversation";
import type { ConversationSummary } from "@/services/conversation.js";

interface ChatMessage {
  id: string;
  content: string;
  role: "USER" | "ASSISTANT";
}

interface ChatWindowProps {
  conversationId: string;
  setConversationId: (id: string) => void;
  conversations: ConversationSummary[];
  setConversations: (conversations: ConversationSummary[]) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const ChatWindow = ({
  conversationId,
  setConversationId,
  setConversations,
  setIsSidebarOpen
}: ChatWindowProps) => {
  const { user } = useAuth();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

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
      if (data.success) {
        setConversations(data.conversations);
      }
      if (data.success && data.conversations.length > 0) {
        const latestConversation = data.conversations[0];
        setConversationId(latestConversation.id);

        const conversation = await getConversation(latestConversation.id);
        if (conversation.success) {
          setMessages(conversation.conversation.messages);
        }
        return;
      }

      const created = await createConversationApi();
      if (created.success && created.conversation) {
        setConversationId(created.conversation.id);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setConversationId, setConversations]);

  useEffect(() => {
    (async () => {
      await initializeChat();
    })();
  }, [initializeChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  };

  const editMessage = (message: ChatMessage) => {
    setEditingMessage(message);
  };

  const handleSend = async (content: string) => {
    if (!conversationId) return;

    const optimisticMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content,
      role: "USER",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setLoading(true);

    try {
      const data = await sendMessage(conversationId, content);

      if (!data.success) {
        throw new Error(data.message);
      }

      setMessages((prev) => [
        ...prev,
        data.assistantMessage,
      ]);

      const chatList = await getConversations();
      if (chatList.success) {
        setConversations(chatList.conversations);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-1 flex-col h-full overflow-hidden bg-zinc-950 text-white">
      {/* Mobile Toggle Bar */}
      <div className="flex items-center px-6 py-4 border-b border-zinc-900 lg:hidden">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="text-zinc-400 hover:text-white text-sm font-medium"
        >
          Menu
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="text-center text-4xl font-bold tracking-tight text-white">
              {user ? `${greeting}, ${firstName}` : "Welcome to Nuci"}
            </h1>

            <p className="mb-12 mt-5 max-w-2xl text-center text-lg leading-8 text-zinc-400">
              How may I help you today?
            </p>

            <SuggestedPrompts />
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={copyMessage}
                onEdit={editMessage}
              />
            ))}

            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput
        onSend={(content) => void handleSend(content)}
        editingMessage={editingMessage}
        clearEditing={() => setEditingMessage(null)}
      />
    </section>
  );
};

export default ChatWindow;