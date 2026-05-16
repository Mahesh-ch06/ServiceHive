import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Smart Leads Dashboard
        </p>
        <h2 className="font-display text-2xl text-white">Lead Operations</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-white/5 bg-ink-800/70 px-3 py-2 text-xs text-slate-200">
          <p className="font-semibold text-white">{user?.name ?? ""}</p>
          <p className="uppercase tracking-wide">{user?.role ?? ""}</p>
        </div>
        <Button variant="ghost" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
