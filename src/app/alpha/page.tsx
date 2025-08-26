import { supabaseServer } from "@/lib/supabaseServer";
import PortfolioPie from "@/components/PortfolioPie";

export const dynamic = "force-dynamic";

type User = { id: string; handle: string; display_name: string };
type Line = { asset_class: string; pct: number };

export default async function Page() {
  const sb = supabaseServer();

  const { data: userRow, error: uerr } = await sb
    .from("users")
    .select("id, handle, display_name")
    .eq("handle", "alpha")
    .single();

  if (uerr || !userRow) {
    return <div className="py-8">ユーザー alpha が見つかりません</div>;
  }

  const { data: snap, error: serr } = await sb
    .from("latest_snapshot")
    .select("snapshot_id, ts, total_value_jpy")
    .eq("user_id", userRow.id)
    .single();

  if (serr || !snap) {
    return <div className="py-8">@alpha の最新スナップショットがありません</div>;
  }

  const { data: lines, error: lerr } = await sb
    .from("portfolio_lines")
    .select("asset_class, pct")
    .eq("snapshot_id", snap.snapshot_id);

  const pieData: Line[] = (lines ?? []).map((l: any) => ({
    asset_class: String(l.asset_class),
    pct: Number(l.pct),
  }));

  return (
    <div className="mx-auto max-w-4xl py-8 grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          {userRow.display_name} <span className="text-neutral-500">@{userRow.handle}</span>
        </h1>
        <div className="text-sm text-neutral-500">{new Date(snap.ts).toLocaleString("ja-JP")}</div>
      </div>
      <PortfolioPie lines={pieData} />
    </div>
  );
}
