"use client";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";

type Line = { asset_class: string; pct: number };

const LABEL_JA: Record<string, string> = {
  equity_jp: "日本株",
  equity_us: "米国株",
  equity_other: "海外株（その他）",
  bond: "債券",
  gold: "金",
  commodity: "コモディティ",
  crypto: "暗号資産",
  cash: "現金",
  other: "その他",
};

export default function PortfolioPie({ lines }: { lines: Line[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="pct"
            data={lines}
            outerRadius={100}
            nameKey="asset_class"
          />
          <Legend formatter={(value: string) => LABEL_JA[value] ?? value} />
          <Tooltip
            labelFormatter={(label: string) => LABEL_JA[label] ?? label}
            formatter={(v: number) => `${Math.round(Number(v) * 100)}%`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
