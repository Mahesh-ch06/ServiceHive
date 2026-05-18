import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Smart Leads Dashboard
          </p>
          <h2 className="font-display text-xl font-semibold text-white lg:text-2xl">
            Lead Operations
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2">
          {/* Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/30 to-brand-600/20 text-xs font-bold text-brand-500">
            {user?.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-tight">{user?.name ?? ""}</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">{user?.role ?? ""}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={logout} className="text-slate-400 hover:text-red-400">
          <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
            <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
