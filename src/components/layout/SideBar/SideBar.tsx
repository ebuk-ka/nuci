import { Plus, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import logo from "@/assets/images/nucilogo1.png";
import type { ConversationSummary } from "@/services/conversation.js";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: ConversationSummary[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

const SideBar = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}: SideBarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 transition-transform duration-300",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:translate-x-0"
        )}
      >
        {/* Header - FIX: Merged structural wrappers to fix squeezing and double lines */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <div className="flex h-10 w-28 shrink-0 items-center justify-center">
            <img
              src={logo}
              alt="Nuci Logo"
              className="w-full scale-125 object-contain"
            />
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-4">
          <Button
            fullWidth
            leftIcon={<Plus size={18} />}
            onClick={onNewChat}
          >
            New Chat
          </Button>
        </div>

        {/* Recent Chats */}
        <div className="flex-1 px-4 overflow-y-auto"> {/* Added overflow scroll to prevent breaking layout when list is long */}
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 px-2">
            Recent Chats
          </h2>

          <div className="space-y-1">
            {(conversations ?? []).length === 0 ? (
              <p className="text-sm text-zinc-600 px-2">
                No conversations yet.
              </p>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`w-full rounded-xl px-3 py-3 text-left text-sm transition-all duration-200 ${
                    activeConversationId === conversation.id
                      ? "bg-cyan-600 text-white font-medium"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <p className="truncate">
                    {conversation.title || "Untitled Chat"} {/* Added fallback if title string is missing/empty */}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;