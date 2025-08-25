"use client";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { useMemo } from "react";
function formatJPY(n:number){ return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(n); }
export default function Page() {
  const total = 12000000;
  const approx = true;
  const lines = useMemo(()=>[
    { asset_class:"equity_jp", pct:0.4 },
    { asset_class:"equity_us", pct:0.3 },
    { asset_class:"bond", pct:0.2 },
    { asset_class:"cash", pct:0.1 }
  ],[]);
  return (
    <div className="grid gap-6 md:grid-cols-2 mx-auto max-w-4xl py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Alpha <span className="text-neutral-500">@alpha</span></h1>
        <div className="text-lg">{formatJPY(total)}</div>
        <div className="text-sm text-neutral-500">{approx ? "概算（100万円単位）" : "正確表示"}</div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="pct" data={lines} outerRadius={100} nameKey="asset_class" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
