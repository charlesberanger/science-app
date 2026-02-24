import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProfileSection() {
  return (
    <div className="flex items-center gap-3 border-t border-[#2a2a2a] px-4 py-3.5">
      <Avatar className="h-8 w-8 border border-[#3a3a3a]">
        <AvatarFallback className="bg-[#1c1c1c] text-[10px] font-medium text-white font-mono">
          AS
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-white">Alice S.</span>
        <span className="font-mono text-[10px] text-[#555]">Researcher</span>
      </div>
    </div>
  );
}
