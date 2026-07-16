import type { ChatMessageProps } from "./ChatMessage.types";
import Card from "@/components/ui/Card";
import { cn } from "@/utils/cn";

const ChatMessage = ({ role, message }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "mb-4 flex w-full gap-3 px-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <Card
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-sm transition-colors duration-200 border-none",
          isUser
            ? "bg-cyan-600 text-white rounded-tr-sm selection:bg-cyan-800"
            : "bg-zinc-800/60 text-zinc-100 rounded-tl-sm backdrop-blur-sm"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message}</p>
      </Card>
    </div>
  );
};

export default ChatMessage;
