export function formatTime(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString("ja-JP", { year:"numeric", month:"numeric", day:"numeric", hour:"2-digit", minute:"2-digit" });
}
