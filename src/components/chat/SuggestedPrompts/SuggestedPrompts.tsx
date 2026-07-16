import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  Laptop,
  Wifi,
  Mail,
  Printer,
  ShieldCheck,
  Gauge,
  Cloud,
  Wrench,
} from "lucide-react";

const suggestedPrompts = [
  { icon: Laptop, text: "OS Support" },
  { icon: Wifi, text: "Internet Help" },
  { icon: Mail, text: " M365 & Mail" },
  { icon: Printer, text: "Printer Diagnostics" },
  { icon: Gauge, text: "Speed Tuning" },
  { icon: ShieldCheck, text: "Security Tips" },
  { icon: Cloud, text: "Cloud Services" },
  { icon: Wrench, text: "Software Installation" },
];

const SuggestedPrompts = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestedPrompts.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const current = suggestedPrompts[index];
  const Icon = current.icon;

  return (
    <div className="mt-10 flex flex-col items-center">
      <p className="mb-4 text-zinc-500">
        I can help with
      </p>

      <div className="min-h-12 overflow-hidden w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.text}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-3"
          >
            <Icon
              size={24}
              className="text-cyan-400 mt-1 shrink-0"
            />

            <span className="text-2xl font-semibold text-white whitespace-normal wrap_break-word">
              {current.text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SuggestedPrompts;