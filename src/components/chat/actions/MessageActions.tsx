import { Copy, Pencil } from "lucide-react";

interface MessageActionsProps {
  onCopy: () => void;
  onEdit?: () => void;
  showEdit?: boolean;
}

const MessageActions = ({
  onCopy,
  onEdit,
  showEdit = false,
}: MessageActionsProps) => {
  return (
    <div className="flex items-center gap-3 text-zinc-500">
      <button
        onClick={onCopy}
        className="transition hover:text-white"
      >
        <Copy size={16} />
      </button>

      {showEdit && (
        <button
          onClick={onEdit}
          className="transition hover:text-white"
        >
          <Pencil size={16} />
        </button>
      )}
    </div>
  );
};

export default MessageActions;