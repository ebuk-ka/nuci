import { Plus, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <div>
           <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-5">
    <div className="flex h-10 w-29 flex-shrink-0 items-center justify-center">
  <img
    src="/src/assets/images/nucilogo1.png"
    alt="Nuci Logo"
    className="w-full scale-125"
  />
</div>

</div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-4">
          <Button fullWidth leftIcon={<Plus size={18} />}>
            New Chat
          </Button>
        </div>

        {/* Recent Chats */}
        <div className="flex-1 px-4">
          <h2 className="mb-4 text-sm font-semibold text-zinc-500">
            Recent Chats
          </h2>

          <p className="text-sm text-zinc-600">
            No conversations yet.
          </p>
        </div>
      </aside>
    </>
  );
};

export default SideBar;