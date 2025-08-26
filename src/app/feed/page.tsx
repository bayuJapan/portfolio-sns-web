import { supabaseServer } from "../../lib/supabaseServer";
export const dynamic = "force-dynamic";
type Author = { id: string; handle: string; display_name: string; is_verified: boolean };
type Post = { id: string; created_at: string; text: string; users: Author | Author[] | null; };
export default async function Page() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("posts")
    .select("id, created_at, text, users:users!posts_user_id_fkey(id,handle,display_name,is_verified)")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) return <div className="py-8">Error: {error.message}</div>;
  const posts = (data ?? []) as Post[];
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-xl font-semibold mb-4">Feed (SSR)</h1>
      <div className="space-y-4">
        {posts.map((p) => {
          const author = Array.isArray(p.users) ? p.users[0] : p.users;
          return (
            <div key={p.id} className="rounded border bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="font-semibold">{author?.display_name ?? "Unknown"}</div>
                {author?.is_verified ? (
                  <span className="text-xs rounded bg-blue-50 text-blue-600 px-2 py-0.5">verified</span>
                ) : null}
                <div className="text-neutral-500 text-sm">@{author?.handle ?? "-"}</div>
                <div className="ml-auto text-neutral-400 text-xs">
                  {new Date(p.created_at).toLocaleString("ja-JP")}
                </div>
              </div>
              <div className="whitespace-pre-wrap">{p.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
