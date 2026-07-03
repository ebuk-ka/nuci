import type { ChatMessageProps } from "./ChatMessage.types";

import Card from "@/components/ui/Card";
import { cn } from "@/utils/cn";

const ChatMessage = ({
  role,
  message,
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "mb-6 flex",
        role === "user"
          ? "justify-end"
          : "justify-start"
      )}
    >
      <Card
        className={cn(
          "max-w-2xl p-5",
          role === "user"
            ? "bg-cyan-600 text-white"
            : "bg-zinc-900"
        )}
      >
        {message}
      </Card>
    </div>
  );
};

export default ChatMessage;