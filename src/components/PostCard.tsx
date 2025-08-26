"use client";
import { Heart, MessageCircle, Share2, MoreHorizontal, BadgeCheck } from "lucide-react";
import AvatarCircle from "./AvatarCircle";
import { formatTime } from "@/lib/format";

type Author = { handle: string; display_name: string; is_verified?: boolean };
type Post = { id: string; created_at: string; text: string; author: Author };

export default function PostCard({ post }: { post: Post }) {
  const a = post.author;
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <AvatarCircle name={a.display_name ?? a.handle} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold truncate">{a.display_name}</span>
            {a.is_verified ? <BadgeCheck className="h-4 w-4 text-sky-600" /> : null}
            <span className="text-neutral-500 text-sm">@{a.handle}</span>
            <span className="text-neutral-400 text-xs ml-auto">{formatTime(post.created_at)}</span>
            <button className="p-1 text-neutral-500 hover:text-black"><MoreHorizontal className="h-4 w-4" /></button>
          </div>
          <div className="mt-2 whitespace-pre-wrap text-[15px] leading-6">
            {post.text}
          </div>
          <div className="mt-3 flex items-center gap-6 text-neutral-500">
            <button className="flex items-center gap-1 hover:text-pink-600">
              <Heart className="h-4 w-4" /> <span className="text-sm">いいね</span>
            </button>
            <button className="flex items-center gap-1 hover:text-sky-600">
              <MessageCircle className="h-4 w-4" /> <span className="text-sm">返信</span>
            </button>
            <button className="flex items-center gap-1 hover:text-emerald-600">
              <Share2 className="h-4 w-4" /> <span className="text-sm">共有</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
