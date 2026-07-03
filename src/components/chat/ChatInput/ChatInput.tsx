import { useEffect, useState } from "react";
import {
  SendHorizontal,
  Laptop,
  Mail,
  Printer,
  Gauge,
  Lock,
  Globe,
  Sunrise,
  Sun,
  Moon,
  type LucideIcon,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface PlaceholderItem {
  icon: LucideIcon;
  text: string;
}

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning! How can I help you today?"
      : hour < 18
      ? "Good afternoon! How can I help you today?"
      : "Good evening! How can I help you today?";

  const greetingIcon =
    hour < 12 ? Sunrise : hour < 18 ? Sun : Moon;

  const placeholderItems: PlaceholderItem[] = [
    {
      icon: greetingIcon,
      text: greeting,
    },
    {
      icon: Laptop,
      text: "Describe your IT issue...",
    },
    {
      icon: Laptop,
      text: "My laptop won't connect to Wi-Fi",
    },
    {
      icon: Mail,
      text: "Outlook isn't opening",
    },
    {
      icon: Printer,
      text: "My printer isn't working",
    },
    {
      icon: Gauge,
      text: "My computer is slow",
    },
    {
      icon: Lock,
      text: "Windows won't let me sign in",
    },
    {
      icon: Globe,
      text: "Browser keeps crashing",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholderItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholderItems.length]);

  const handleSubmit = () => {
    if (!message.trim()) return;

    console.log(message);

    setMessage("");
  };

  const CurrentIcon = placeholderItems[index].icon;

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 p-6">
      <div className="mx-auto flex max-w-4xl items-center gap-4">
        <Input
          leftIcon={<CurrentIcon size={18} />}
          value={message}
          placeholder={placeholderItems[index].text}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <Button onClick={handleSubmit}>
          <SendHorizontal size={18} />
        </Button>
      </div>

      <p className="mt-3 text-center text-sm text-zinc-500">
        Any External hardware issues, will be escalated to the It team.
      </p>
    </div>
  );
};

export default ChatInput;