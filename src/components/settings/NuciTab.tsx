import { useState } from "react";

export default function NuciTab() {
  const [responseStyle, setResponseStyle] =
    useState("Balanced");

  const [os, setOs] = useState("Windows");

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">
        Nuci Preferences
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        Personalize how Nuci assists you.
      </p>

      <div className="mt-8 space-y-8">

        <div>
          <label className="mb-3 block text-sm text-zinc-500">
            Response Style
          </label>

          <select
            value={responseStyle}
            onChange={(e) =>
              setResponseStyle(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
          >
            <option>Quick</option>
            <option>Balanced</option>
            <option>Detailed</option>
          </select>
        </div>

        <div>
          <label className="mb-3 block text-sm text-zinc-500">
            Default Operating System
          </label>

          <select
            value={os}
            onChange={(e) => setOs(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
          >
            <option>Windows</option>
            <option>macOS</option>
            <option>Linux</option>
            <option>Android</option>
            <option>iPhone / iPad</option>
          </select>
        </div>

      </div>
    </div>
  );
}