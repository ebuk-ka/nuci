const TypingIndicator = () => {
  return (
    <div className="mr-auto rounded-3xl border border-zinc-800 bg-zinc-900 px-5 py-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></span>

        <span
          className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
          style={{ animationDelay: "0.15s" }}
        />

        <span
          className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );
};

export default TypingIndicator;