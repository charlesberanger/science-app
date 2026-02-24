import NavItem from "./NavItem";
import ProfileSection from "./ProfileSection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`
        fixed left-0 top-0 z-30 flex h-screen w-[220px] flex-col
        border-r border-[#2a2a2a] bg-[#111]
        transition-transform duration-200 ease-in-out
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Brand */}
      <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#2a2a2a] bg-white">
            <span className="text-[10px] font-bold text-black">S</span>
          </div>
          <span
            className="text-xs uppercase tracking-widest text-white"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Science
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center text-[#555] transition-colors hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Nav */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto py-5">
        <div>
          <span
            className="mb-1 block px-4 text-[9px] uppercase tracking-widest text-[#333]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Navigation
          </span>
          <NavItem label="Get Started" href="/get-started" icon="⊞" />
          <NavItem label="My Profile" href="/profile" icon="◈" />
        </div>

        <div>
          <span
            className="mb-1 block px-4 text-[9px] uppercase tracking-widest text-[#333]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Challenge
          </span>
          <NavItem label="Submit Project" href="/submit" icon="↑" />
          <NavItem label="My Submission" href="/submission" icon="◐" />
        </div>

        <div>
          <span
            className="mb-1 block px-4 text-[9px] uppercase tracking-widest text-[#333]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Explore
          </span>
          <NavItem label="Browse Projects" href="/browse" icon="⊞" />
          <NavItem label="Leaderboard" href="/leaderboard" icon="▲" />
        </div>
      </div>

      <ProfileSection />
    </aside>
  );
}
