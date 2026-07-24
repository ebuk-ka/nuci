import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronRight,
  ArrowLeft,
  User,
  Bot,
  Database,
  Info,
} from "lucide-react";

import AccountTab from "./AccountTab";
import NuciTab from "./NuciTab";
import DataTab from "./Datatab";
import AboutTab from "./AboutTab";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

type Page = "home" | "account" | "nuci" | "data" | "about";

const SettingsModal = ({
  open,
  onClose,
}: SettingsModalProps) => {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setPage("home");
    }
  }, [open]);

  if (!open) return null;

  const SettingCard = ({
    icon,
    title,
    description,
    onClick,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-cyan-500 hover:bg-zinc-900"
    >
      <div className="flex items-center gap-4 text-left">
        <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight
        className="text-zinc-500"
        size={20}
      />
    </button>
  );

  const renderPage = () => {
    switch (page) {
      case "account":
        return <AccountTab />;

      case "nuci":
        return <NuciTab />;

      case "data":
        return <DataTab />;

      case "about":
        return <AboutTab />;

      default:
        return (
          <div className="space-y-4">

            <SettingCard
              icon={<User size={22} />}
              title="Account"
              description="Manage your profile and password."
              onClick={() => setPage("account")}
            />

            <SettingCard
              icon={<Bot size={22} />}
              title="Nuci"
              description="Customize your AI experience."
              onClick={() => setPage("nuci")}
            />

            <SettingCard
              icon={<Database size={22} />}
              title="Data"
              description="Manage conversations and storage."
              onClick={() => setPage("data")}
            />

            <SettingCard
              icon={<Info size={22} />}
              title="About"
              description="Version, support and information."
              onClick={() => setPage("about")}
            />

          </div>
        );
    }
  };

  const title =
    page === "home"
      ? "Settings"
      : page.charAt(0).toUpperCase() +
        page.slice(1);

  return (
    <AnimatePresence>

      <motion.div
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.97,
        }}
        transition={{
          duration: 0.22,
        }}
        className="fixed left-1/2 top-1/2 z-[100] flex h-[90vh] w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-[#050505] shadow-2xl"
      >

        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

          <div className="flex items-center gap-3">

            {page !== "home" && (
              <button
                onClick={() => setPage("home")}
                className="rounded-xl p-2 transition hover:bg-zinc-900"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            <div>
              <h2 className="text-2xl font-bold text-white">
                {title}
              </h2>

              {page === "home" && (
                <p className="text-sm text-zinc-500">
                  Personalize your Nuci experience.
                </p>
              )}
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-zinc-900"
          >
            <X size={20} />
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-6">

          <AnimatePresence mode="wait">

            <motion.div
              key={page}
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -20,
              }}
              transition={{
                duration: 0.18,
              }}
            >
              {renderPage()}
            </motion.div>

          </AnimatePresence>

        </div>

      </motion.div>

    </AnimatePresence>
  );
};

export default SettingsModal;