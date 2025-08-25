"use client";
import { useMemo, useState, ChangeEvent } from "react";

type Privacy = "hidden" | "approx" | "exact";
type Row = { handle: string; name: string; total: number; privacy: Privacy };

const DATA: ReadonlyArray<Row> = [
  { handle: "alpha", name: "Alpha", total: 12000000, privacy: "approx" },
  { handle: "beta",  name: "Beta",  total:  4500000, privacy: "exact"  }
];

export default function Page() {
  const [sort, setSort] = useState<"desc" | "asc">("desc");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return DATA
      .filter(r =>
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.handle.includes(q)
      )
      .sort((a, b) => (sort === "desc" ? b.total - a.total : a.total - b.total));
  }, [q, sort]); // DATAはモジュール定数なので依存不要

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSort(e.target.value as "desc" | "asc");

  return (
    <div className="space-y-4 mx-auto max-w-2xl py-8">
      <h1 className="text-xl font-semibold">Discover</h1>
      <div className="flex gap-3">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="検索..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={sort}
          onChange={onSortChange}
        >
          <option value="desc">資産額: 高い順</option>
          <option value="asc">資産額: 低い順</option>
        </select>
      </div>
      <ul className="divide-y bg-white rounded border">
        {filtered.map((r) => (
          <li key={r.handle} className="p-3 flex justify-between">
            <div>
              <div className="font-medium">
                {r.name} <span className="text-neutral-500">@{r.handle}</span>
              </div>
              <div className="text-sm text-neutral-500">privacy: {r.privacy}</div>
            </div>
            <div className="font-semibold">
              {Intl.NumberFormat("ja-JP").format(r.total)} 円
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
