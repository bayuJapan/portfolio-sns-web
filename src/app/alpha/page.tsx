import { supabaseServer } from "../../lib/supabaseServer";
import PortfolioPie from "../../components/PortfolioPie";
export const dynamic = "force-dynamic";
function formatJPY(n:number){ return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(n); }
export default async function Page() {
  const sb = supabaseServer();
  const { data: user } = await sb.from("users").select("id,handle,display_name,privacy_asset_amount").eq("handle","alpha").single();
  if (!user) return <div className="py-8">not found</div>;
  const { data: snap } = await sb.from("latest_snapshot").select("snapshot_id,total_value_jpy").eq("user_id", user.id).single();
  const { data: lines } = await sb.from("portfolio_lines").select("asset_class,pct").eq("snapshot_id", snap?.snapshot_id);
  const approx = user.privacy_asset_amount !== "exact";
  return (
    <div className="grid gap-6 md:grid-cols-2 mx-auto max-w-4xl py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{user.display_name} <span className="text-neutral-500">@{user.handle}</span></h1>
        <div className="text-lg">{formatJPY(Number(snap?.total_value_jpy ?? 0))}</div>
        <div className="text-sm text-neutral-500">{approx ? "概算（100万円単位）" : "正確表示"}</div>
      </div>
      <PortfolioPie lines={(lines ?? []).map(l => ({ asset_class: String(l.asset_class), pct: Number(l.pct) }))} />
    </div>
  );
}
