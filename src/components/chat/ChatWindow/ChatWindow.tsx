import SuggestedPrompts from "../SuggestedPrompts";
import ChatInput from "../ChatInput";

const ChatWindow = () => {
  return (
    <section className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <h1 className="mb-4 text-center text-5xl font-bold">
           Welcome to Nuci
        </h1>

        <p className="mb-12 max-w-2xl text-center text-lg text-zinc-400">
          AI-powered IT Support for Individuals and Businesses.
          How can I help you today?
        </p>

        <SuggestedPrompts />
      </div>

      <ChatInput />
    </section>
  );
};

export default ChatWindow;