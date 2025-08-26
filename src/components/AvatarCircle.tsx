"use client";
export default function AvatarCircle({ name }: { name: string }) {
  const initial = (name ?? "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <div className="h-10 w-10 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center font-semibold">
      {initial}
    </div>
  );
}
