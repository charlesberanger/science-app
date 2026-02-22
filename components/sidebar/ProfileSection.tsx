import Avatar from "@/components/ui/Avatar";

export default function ProfileSection() {
  return (
    <div className="flex items-center gap-3 border-t border-[#2a2a2a] px-4 py-3.5">
      <Avatar />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-white">Alice S.</span>
        <span
          className="text-[10px] text-[#555]"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Researcher
        </span>
      </div>
    </div>
  );
}
