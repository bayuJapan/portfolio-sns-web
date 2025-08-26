import { supabaseServer } from "../../../lib/supabase/server";

export const revalidate = 0;

type Author =
  | { id: string; handle: string; display_name: string | null; is_verified: boolean }
  | null;

type PostRow = {
  id: string;
  text: string;
  created_at: string;
  users:
    | { id: string; handle: string; display_name: string | null; is_verified: boolean }[]
    | { id: string; handle: string; display_name: string | null; is_verified: boolean }
    | null;
};

export default async function FeedPage() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      text,
      created_at,
      users:users!posts_user_id_fkey (
        id, handle, display_name, is_verified
      )
    `)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Feed (SSR)</h1>
        <pre className="text-red-600 whitespace-pre-wrap">Error: {error.message}</pre>
      </div>
    );
  }

  const posts = (data ?? []) as PostRow[];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Feed (SSR)</h1>

      {posts.length === 0 ? (
        <div className="text-neutral-500">まだ投稿がありません。</div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => {
            const authorRaw = p.users;
            const author: Author = Array.isArray(authorRaw)
              ? (authorRaw[0] ?? null)
              : (authorRaw as Author);

            return (
              <div key={p.id} className="rounded border bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-semibold">
                    {author?.display_name ?? author?.handle ?? "Unknown"}
                  </div>
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
      )}
    </div>
  );
}
