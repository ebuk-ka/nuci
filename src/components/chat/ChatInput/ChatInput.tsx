import { useState } from "react";
import { ArrowUp, Sunrise, Sun, Moon } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn"; // Assumes you have a tailwind merge utility

const ChatInput = () => {
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
    console.log(message);
    setMessage("");
  };

  return (
    <div className="border-t border-zinc-900 bg-zinc-950 p-6">
      <div className="mx-auto max-w-3xl">
        {/* Unified Premium Capsule Container */}
        <div className="group relative flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2 pl-4 transition-all duration-300 focus-within:border-zinc-700 focus-within:bg-zinc-900/80 focus-within:ring-2 focus-within:ring-cyan-500/20">
          
          {/* Subtle contextual greeting icon */}
          <div className="text-zinc-500 transition-colors group-focus-within:text-zinc-400">
            <Icon size={18} strokeWidth={1.75} />
          </div>

          {/* Clean borderless input wrapper */}
          <div className="flex-1">
            <Input
              value={message}
              placeholder={placeholderText}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full border-none bg-transparent px-1 py-2 text-[15px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Minimalist modern action button */}
          <Button
            onClick={handleSubmit}
            disabled={!hasText}
            className={cn(
              "h-9 w-9 rounded-xl p-0 flex items-center justify-center transition-all duration-300",
              hasText
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/10 hover:bg-cyan-500 scale-100"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed scale-95"
            )}
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </Button>
        </div>

        {/* Footer info text */}
        <p className="mt-3 text-center text-xs tracking-wide text-zinc-600">
          External hardware issues will be escalated to the IT team.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
