import MessageActions from "../actions/MessageActions";

interface ChatMessage {
  id: string;
  content: string;
  role: "USER" | "ASSISTANT";
}

interface MessageBubbleProps {
  message: ChatMessage;
  onCopy: (text: string) => void;
  onEdit?: (message: ChatMessage) => void;
}

const MessageBubble = ({
  message,
  onCopy,
  onEdit,
}: MessageBubbleProps) => {
  const isUser = message.role === "USER";

  return (
    <div
      className={`group flex w-full flex-col ${
        isUser ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-sm ${
          isUser
            ? "bg-cyan-500 text-white"
            : "border border-zinc-800 bg-zinc-900 text-white"
        }`}
      >
        <p className="whitespace-pre-wrap leading-7">
          {message.content}
        </p>
      </div>

      <div
        className={`mt-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 ${
          isUser ? "mr-2 self-end" : "ml-2 self-start"
        }`}
      >
        <MessageActions
          onCopy={() => onCopy(message.content)}
          showEdit={isUser}
          onEdit={() => onEdit?.(message)}
        />
      </div>
    </div>
  );
};

export default MessageBubble;