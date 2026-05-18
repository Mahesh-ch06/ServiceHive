import { NavLink, Link } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navContent = (
    <>
      <div className="space-y-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-lg font-bold text-white shadow-lg shadow-brand-500/20">
            S
          </div>
          <div>
            <h1 className="font-display text-base font-semibold text-white">
              Smart Leads
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Dashboard
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
            Menu
          </p>
          <NavLink
            to="/dashboard"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-brand-500/15 text-brand-500"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1A1.5 1.5 0 016 3.5v1A1.5 1.5 0 014.5 6h-1A1.5 1.5 0 012 4.5v-1zM2 9.5A1.5 1.5 0 013.5 8h1A1.5 1.5 0 016 9.5v1A1.5 1.5 0 014.5 12h-1A1.5 1.5 0 012 10.5v-1zM2 15.5A1.5 1.5 0 013.5 14h1A1.5 1.5 0 016 15.5v1A1.5 1.5 0 014.5 18h-1A1.5 1.5 0 012 16.5v-1zM8 3.5A1.5 1.5 0 019.5 2h7A1.5 1.5 0 0118 3.5v1A1.5 1.5 0 0116.5 6h-7A1.5 1.5 0 018 4.5v-1zM8 9.5A1.5 1.5 0 019.5 8h7A1.5 1.5 0 0118 9.5v1A1.5 1.5 0 0116.5 12h-7A1.5 1.5 0 018 10.5v-1zM8 15.5A1.5 1.5 0 019.5 14h7A1.5 1.5 0 0118 15.5v1A1.5 1.5 0 0116.5 18h-7A1.5 1.5 0 018 16.5v-1z" clipRule="evenodd" />
            </svg>
            Leads
          </NavLink>

          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
            </svg>
            Home
          </Link>
        </nav>
      </div>

      {/* Bottom info */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <p className="text-xs leading-relaxed text-slate-500">
          Centralize inbound leads, respond fast, and keep every pipeline stage visible.
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-white/5 bg-ink-800/60 p-5 lg:flex">
        {navContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col justify-between bg-ink-800 p-5 shadow-2xl animate-slide-in-left">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
