import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden h-screen w-64 flex-col justify-between border-r border-white/5 bg-ink-800/80 p-6 lg:flex">
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Smart Leads
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-white">
            Dashboard
          </h1>
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-brand-500 text-ink-900"
                  : "text-slate-200 hover:bg-ink-700"
              }`
            }
          >
            <span>Leads</span>
            <span className="text-xs">CRM</span>
          </NavLink>
        </nav>
      </div>
      <div className="rounded-xl border border-white/5 bg-ink-700/70 p-4 text-xs text-slate-200">
        Centralize inbound leads, respond fast, and keep every pipeline stage visible.
      </div>
    </aside>
  );
};

export default Sidebar;
