import { supabaseServer } from "../../../lib/supabase/server";
export const revalidate = 0;

type PostRow = { id: string; text: string; created_at: string };

export default async function FeedPage() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("posts")
    .select("id,text,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">Feed (SSR)</h1>
        <pre className="text-red-600 whitespace-pre-wrap">{String(error.message)}</pre>
      </div>
    );
  }

  const posts = (data ?? []) as PostRow[];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Feed (SSR)</h1>
      <div className="mb-4 text-sm text-neutral-600">posts: {posts.length}</div>
      {posts.length === 0 ? (
        <div className="text-neutral-500">まだ投稿がありません。</div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="rounded border bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="ml-auto text-neutral-400 text-xs">
                  {new Date(p.created_at).toLocaleString("ja-JP")}
                </div>
              </div>
              <div className="whitespace-pre-wrap">{p.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
