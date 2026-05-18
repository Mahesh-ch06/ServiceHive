import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const dashLink = isAuthenticated ? "/dashboard" : "/register";
  const dashLabel = isAuthenticated ? "Open Dashboard" : "Start Free";

  return (
    <div className="min-h-screen bg-ink-900 text-white overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-ink-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-xs font-black tracking-tight text-white">SL</div>
            <span className="font-display text-[15px] font-semibold">SmartLeads</span>
          </Link>
          <div className="flex items-center gap-2">
            {!isAuthenticated && (
              <Link to="/login" className="hidden rounded-lg px-4 py-2 text-[13px] font-medium text-slate-400 transition hover:text-white sm:inline-flex">
                Sign in
              </Link>
            )}
            <Link to={dashLink} className="rounded-lg bg-brand-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-brand-600">
              {dashLabel}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative px-6 pb-20 pt-16 sm:pt-24">
        {/* BG accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-500/[0.07] blur-[120px]" />
          <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Built with MERN + TypeScript
            </div>

            <h1 className="mt-7 font-display text-[2.5rem] font-bold leading-[1.15] tracking-tight sm:text-[3.5rem]">
              The lead pipeline
              <br />
              <span className="text-brand-500">your team deserves</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Track inbound leads, manage pipeline stages, control access by role — and export everything to CSV. Built for teams that move fast.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to={dashLink} className="rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 hover:shadow-brand-500/30">
                {dashLabel} →
              </Link>
              <a href="#features" className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/[0.12] hover:bg-white/[0.04]">
                See features
              </a>
            </div>
          </div>

          {/* ── Dashboard Preview ── */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-xl border border-white/[0.06] bg-ink-800/50 p-1.5 shadow-2xl shadow-black/40">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <div className="ml-3 h-4 flex-1 rounded bg-white/[0.04]" />
              </div>
              {/* Dashboard mockup */}
              <div className="rounded-lg bg-ink-900/80 p-4 sm:p-6">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { n: "128", l: "Total", c: "text-white" },
                    { n: "34", l: "New", c: "text-emerald-400" },
                    { n: "52", l: "Qualified", c: "text-amber-400" },
                    { n: "12", l: "Lost", c: "text-red-400" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-3">
                      <p className={`font-display text-xl font-bold ${s.c} sm:text-2xl`}>{s.n}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">{s.l}</p>
                    </div>
                  ))}
                </div>
                {/* Fake table */}
                <div className="mt-4 rounded-lg border border-white/[0.04] bg-white/[0.02] overflow-x-auto">
                  <div className="min-w-[600px]">
                    <div className="grid grid-cols-5 gap-2 border-b border-white/[0.04] px-4 py-2.5">
                      {["Lead", "Email", "Status", "Source", "Date"].map((h) => (
                        <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{h}</p>
                      ))}
                    </div>
                    {[
                      { name: "Ananya S.", email: "ananya@co.in", status: "New", sc: "badge-new", src: "Website" },
                      { name: "Rahul M.", email: "rahul@mail.io", status: "Qualified", sc: "badge-qualified", src: "Referral" },
                      { name: "Priya K.", email: "priya@dev.co", status: "Contacted", sc: "badge-contacted", src: "Instagram" },
                    ].map((r) => (
                      <div key={r.name} className="grid grid-cols-5 items-center gap-2 border-b border-white/[0.02] px-4 py-3">
                        <p className="text-xs font-medium text-white">{r.name}</p>
                        <p className="text-[11px] text-slate-500">{r.email}</p>
                        <span className={`justify-self-start rounded-full px-2 py-0.5 text-[10px] font-medium ${r.sc}`}>{r.status}</span>
                        <p className="text-[11px] text-slate-400">{r.src}</p>
                        <p className="text-[11px] text-slate-500">17 May 2026</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="border-y border-white/[0.04] px-6 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { value: "100%", label: "TypeScript" },
            { value: "JWT", label: "Auth System" },
            { value: "RBAC", label: "Role Access" },
            { value: "CSV", label: "Data Export" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-500">Core capabilities</p>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Built for real workflows</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
            Every feature is designed around how sales teams actually work — no bloat, no gimmicks.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Full lead CRUD",
                desc: "Create, view, update and delete leads with validated forms and real-time optimistic updates via React Query.",
                icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              },
              {
                title: "Multi-dimension filters",
                desc: "Combine status, source, search and sort simultaneously. Debounced search prevents excess API calls — 500ms delay.",
                icon: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              },
              {
                title: "Role-based access",
                desc: "Admin and Sales roles with scoped permissions. Only admins can delete leads — enforced on both client and server.",
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              },
              {
                title: "CSV export",
                desc: "Export filtered lead data as CSV with a single click. All current filters are respected in the exported dataset.",
                icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              },
              {
                title: "Server pagination",
                desc: "Backend-driven pagination with skip/limit. Metadata includes total, pages, hasNext, and hasPrev for seamless navigation.",
                icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              },
              {
                title: "Password recovery",
                desc: "Forgot password flow with crypto-secure reset tokens, 1-hour expiry, and confirm-password validation on reset.",
                icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              },
            ].map((f) => (
              <div key={f.title} className="group rounded-xl border border-white/[0.04] bg-white/[0.015] p-5 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={f.icon} /></svg>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="border-t border-white/[0.04] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-500">Architecture</p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Clean, scalable codebase</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Structured as a monorepo with clearly separated client and server packages. Every layer follows established patterns.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Frontend", desc: "React 18 · TypeScript · TailwindCSS · Zustand · React Query · Zod" },
                  { title: "Backend", desc: "Node.js · Express · TypeScript · MongoDB · Mongoose · JWT · bcrypt" },
                  { title: "DevOps", desc: "Docker Compose · Vercel (client) · Render (server) · GitHub CI" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-500/10">
                      <svg viewBox="0 0 20 20" width="12" height="12" fill="#ff7a1a"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[13px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Folder structure visual */}
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-5 font-mono text-[12px] leading-6 text-slate-400">
              <p className="mb-2 font-display font-semibold text-white not-italic text-sm">Project structure</p>
              <pre className="whitespace-pre text-slate-500">{`├── client/
│   ├── src/
│   │   ├── api/          # Axios client & endpoints
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # useDebounce, useAuth, usePagination
│   │   ├── pages/        # Route-level pages
│   │   ├── store/        # Zustand auth & filter stores
│   │   ├── validations/  # Zod schemas
│   │   └── types/        # Shared TypeScript types
│   └── Dockerfile
├── server/
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic layer
│   │   ├── middleware/    # Auth, RBAC, validation
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # Express routers
│   │   └── validations/  # Zod server schemas
│   └── Dockerfile
└── docker-compose.yml`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to streamline your pipeline?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
            Create an account in seconds. No credit card, no setup — just leads.
          </p>
          <Link to={dashLink} className="mt-7 inline-flex rounded-lg bg-brand-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600">
            {dashLabel} →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.04] px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-500 text-[9px] font-black text-white">SL</div>
            <span className="text-[13px] font-medium text-slate-400">SmartLeads Dashboard</span>
          </div>
          <p className="text-[11px] text-slate-600">&copy; {new Date().getFullYear()} · MERN Full-Stack Assignment</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
