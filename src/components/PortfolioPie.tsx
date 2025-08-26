"use client";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";
type Line = { asset_class: string; pct: number };
export default function PortfolioPie({ lines }: { lines: Line[] }) {
  const data = (lines ?? []).map(l => ({ name: l.asset_class, pct: Number(l.pct) }));
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="pct" data={data} outerRadius={100} nameKey="name" />
          <Legend />
          <Tooltip formatter={(v: number) => `${Math.round(Number(v) * 100)}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
