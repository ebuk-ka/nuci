import Button from "@/components/ui/Button";

export default function DataTab() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">
        Data
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        Manage your conversations and account.
      </p>

      <div className="mt-8 space-y-4">

        <Button variant="secondary">
          Clear Conversations
        </Button>

        <Button variant="secondary">
          Export Conversations
        </Button>

        <Button
          className="bg-red-600 hover:bg-red-500"
        >
          Delete Account
        </Button>

      </div>
    </div>
  );
}