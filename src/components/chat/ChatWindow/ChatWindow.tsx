import SuggestedPrompts from "../SuggestedPrompts";
import ChatInput from "../ChatInput";
import { useAuth } from "@/hooks/useAuth";

const ChatWindow = () => {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  
  const firstName = user?.fullName.split(" ")[0];

  return (
    <section className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6">

        <h1 className="text-center text-4xl font-bold tracking-tight text-white">
          {user ? `${greeting}, ${firstName}` : "Welcome to Nuci"}
        </h1>

        <p className="mt-5 mb-12 max-w-2xl text-center text-lg leading-8 text-zinc-400">
          How may I help you today
        </p>

        <SuggestedPrompts />
      </div>

      <ChatInput />
    </section>
  );
};

export default ChatWindow;