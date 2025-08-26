import { supabaseServer } from "../../lib/supabaseServer";
import PostCard from "../../components/PostCard";
export const dynamic = "force-dynamic";

type Author = { id: string; handle: string; display_name: string; is_verified: boolean };
type PostRow = { id: string; created_at: string; text: string; users: Author | Author[] | null };

export default async function Page() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("posts")
    .select("id, created_at, text, users:users!posts_user_id_fkey(id,handle,display_name,is_verified)")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) return <div className="py-8">Error: {error.message}</div>;
  const rows = (data ?? []) as PostRow[];
  const posts = rows.map((p) => {
    const u = Array.isArray(p.users) ? p.users[0] : p.users;
    return { id: p.id, created_at: p.created_at, text: p.text, author: { handle: u?.handle ?? "-", display_name: u?.display_name ?? "Unknown", is_verified: !!u?.is_verified } };
  });

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-xl font-semibold mb-4">Feed (SSR)</h1>
      <div className="space-y-4">
        {posts.map((p) => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}
