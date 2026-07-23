import { useEffect, useState } from "react";
import {
  ArrowUp,
  Sunrise,
  Sun,
  Moon,
  X,
  Check,
  Pencil,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface ChatInputProps {
  onSend: (content: string) => void;

  editingMessage?: {
    id: string;
    content: string;
  } | null;

  clearEditing?: () => void;
}

const ChatInput = ({
  onSend,
  editingMessage,
  clearEditing,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.content);
    }
  }, [editingMessage]);

  const hour = new Date().getHours();

  const isMorning = hour < 12;
  const isAfternoon = hour < 18;

  const Icon = isMorning ? Sunrise : isAfternoon ? Sun : Moon;

  const placeholderText = editingMessage
    ? "Update your message..."
    : isMorning
    ? "Good morning! Describe your IT issue..."
    : isAfternoon
    ? "Good afternoon! Describe your IT issue..."
    : "Good evening! Describe your IT issue...";

  const hasText = message.trim().length > 0;

  const handleSubmit = () => {
    if (!hasText) return;

    onSend(message.trim());

    setMessage("");
    clearEditing?.();
  };

  const handleCancel = () => {
    setMessage("");
    clearEditing?.();
  };

  return (
    <div className="border-t border-zinc-900 bg-zinc-950 p-4 sm:p-6">

      <div className="mx-auto flex max-w-3xl flex-col gap-3">

        {/* Editing Banner */}

        {editingMessage && (
          <div className="flex items-start justify-between gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3">

            <div className="flex items-start gap-3">

              <div className="rounded-lg bg-cyan-500/20 p-2">
                <Pencil
                  size={16}
                  className="text-cyan-400"
                />
              </div>

              <div>

                <p className="text-sm font-medium text-cyan-300">
                  Editing Message
                </p>

                <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                  {editingMessage.content}
                </p>

              </div>

            </div>

            <button
              onClick={handleCancel}
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
            >
              <X size={16} />
            </button>

          </div>
        )}

        {/* Input */}

        <div
          className="
          group
          relative
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900/40
          p-2
          pl-4
          transition-all
          duration-300
          focus-within:border-cyan-500/40
          focus-within:ring-2
          focus-within:ring-cyan-500/20
        "
        >

          <div className="text-zinc-500 transition group-focus-within:text-cyan-400">
            <Icon size={18} />
          </div>

          <div className="flex-1">

            <Input
              value={message}
              placeholder={placeholderText}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="
                w-full
                border-none
                bg-transparent
                px-1
                py-2
                text-[15px]
                text-zinc-100
                placeholder-zinc-500
                focus:outline-none
                focus:ring-0
              "
            />

          </div>

          <Button
            onClick={handleSubmit}
            disabled={!hasText}
            className={cn(
              "flex h-10 min-w-[40px] items-center justify-center rounded-xl transition-all duration-300",
              hasText
                ? "bg-cyan-600 text-white hover:bg-cyan-500"
                : "cursor-not-allowed bg-zinc-800 text-zinc-600"
            )}
          >
            {editingMessage ? (
              <div className="flex items-center gap-2 px-3">

                <Check size={16} />

                <span className="hidden sm:inline">
                  Update
                </span>

              </div>
            ) : (
              <ArrowUp size={18} />
            )}
          </Button>

        </div>

        {/* Footer */}

        <div className="flex flex-col items-center gap-1 text-center">

          <p className="text-xs text-zinc-600">
            External hardware issues will be escalated to the IT team.
          </p>

          {editingMessage && (
            <p className="text-xs text-cyan-500">
              Press Enter to update your message.
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default ChatInput;