import { useState } from "react";
import { ArrowUp, Sunrise, Sun, Moon } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const hour = new Date().getHours();
  const isMorning = hour < 12;
  const isAfternoon = hour < 18;

  const placeholderText = isMorning
    ? "Good morning! Describe your IT issue..."
    : isAfternoon
    ? "Good afternoon! Describe your IT issue..."
    : "Good evening! Describe your IT issue...";

  const Icon = isMorning ? Sunrise : isAfternoon ? Sun : Moon;

  const hasText = message.trim().length > 0;

  const handleSubmit = () => {
    if (!message.trim()) return;

    onSend(message.trim());

    setMessage("");
  };

  return (
    <div className="border-t border-zinc-900 bg-zinc-950 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="group relative flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2 pl-4 transition-all duration-300 focus-within:border-zinc-700 focus-within:bg-zinc-900/80 focus-within:ring-2 focus-within:ring-cyan-500/20">

          <div className="text-zinc-500 transition-colors group-focus-within:text-zinc-400">
            <Icon size={18} strokeWidth={1.75} />
          </div>

          <div className="flex-1">
            <Input
              value={message}
              placeholder={placeholderText}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              className="w-full border-none bg-transparent px-1 py-2 text-[15px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!hasText}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl p-0 transition-all duration-300",
              hasText
                ? "scale-100 bg-cyan-600 text-white shadow-md shadow-cyan-600/10 hover:bg-cyan-500"
                : "scale-95 cursor-not-allowed bg-zinc-800 text-zinc-600"
            )}
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </Button>
        </div>

        <p className="mt-3 text-center text-xs tracking-wide text-zinc-600">
          External hardware issues will be escalated to the IT team.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;