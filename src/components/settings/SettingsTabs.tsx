interface Props {
  tab: string;
  setTab: (tab: string) => void;
}

const tabs = [
  {
    id: "account",
    label: "Account",
  },
  {
    id: "nuci",
    label: "Nuci",
  },
  {
    id: "data",
    label: "Data",
  },
  {
    id: "about",
    label: "About",
  },
];

export default function SettingsTabs({
  tab,
  setTab,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 border-b border-zinc-800 pb-4">
      {tabs.map((item) => (
        <button
          key={item.id}
          onClick={() => setTab(item.id)}
          className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
            tab === item.id
              ? "bg-cyan-600 text-white"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}