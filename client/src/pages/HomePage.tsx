import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const features = [
  {
    title: "Lead Management",
    description: "Create, update, and delete leads with a clean, intuitive interface. Full CRUD operations with real-time updates.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    )
  },
  {
    title: "Advanced Filtering",
    description: "Filter by status, source, or search by name and email. Combine multiple filters simultaneously.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
      </svg>
    )
  },
  {
    title: "CSV Export",
    description: "Export your filtered leads to CSV with one click. Perfect for reports, sharing, and offline analysis.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    )
  },
  {
    title: "Role-Based Access",
    description: "Admins and Sales users see different capabilities. Only admins can delete leads, ensuring data safety.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  },
  {
    title: "Smart Pagination",
    description: "Server-side pagination with 10 records per page. Navigate through leads efficiently with page metadata.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    )
  },
  {
    title: "Debounced Search",
    description: "Real-time search with 500ms debounce for optimal performance. Search across names and emails instantly.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    )
  }
];

const techStack = [
  { name: "React", color: "text-cyan-400" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "TailwindCSS", color: "text-teal-400" },
  { name: "Node.js", color: "text-green-400" },
  { name: "Express", color: "text-yellow-400" },
  { name: "MongoDB", color: "text-emerald-400" },
  { name: "Docker", color: "text-sky-400" },
  { name: "Zod", color: "text-indigo-400" }
];

const steps = [
  {
    step: "01",
    title: "Create Account",
    description: "Register with your email and get instant access to the dashboard."
  },
  {
    step: "02",
    title: "Add Leads",
    description: "Add leads from various sources — website, Instagram, or referrals."
  },
  {
    step: "03",
    title: "Track Pipeline",
    description: "Track status, filter, export, and manage your entire sales pipeline."
  }
];

const HomePage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-sm font-bold text-white">
              S
            </div>
            <span className="font-display text-lg font-semibold text-white">
              Smart Leads
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:shadow-brand-500/30 hover:brightness-110"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:shadow-brand-500/30 hover:brightness-110"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20 auth-bg">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-500">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              MERN Stack Lead Management
            </span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl animate-slide-up" style={{ animationDelay: "100ms" }}>
            Manage your leads
            <br />
            <span className="gradient-text">with precision</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 animate-slide-up" style={{ animationDelay: "200ms" }}>
            Track every inbound lead, manage pipeline stages, and export data — all from a
            beautiful, role-based dashboard built with React, TypeScript, and MongoDB.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/35 hover:brightness-110"
            >
              {isAuthenticated ? "Open Dashboard" : "Get Started Free"}
            </Link>
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-8 py-3 text-sm font-semibold text-slate-300 transition-all hover:bg-white/[0.06] hover:text-white"
            >
              {isAuthenticated ? "View Leads" : "Sign In"}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Features</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Everything you need to manage leads
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              A comprehensive toolkit built with clean architecture and scalable code practices.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/5 bg-ink-800/40 p-6 transition-all duration-300 hover:border-white/10 hover:bg-ink-800/60 hover-lift animate-slide-up"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-colors group-hover:bg-brand-500/15">
                  {feature.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-500">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Get started in 3 simple steps
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3 stagger">
            {steps.map((step) => (
              <div key={step.step} className="relative text-center animate-slide-up">
                <span className="font-display text-5xl font-bold text-white/[0.04]">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Tech Stack</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Built with modern technologies
            </h2>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`rounded-full border border-white/5 bg-white/[0.03] px-5 py-2.5 text-sm font-medium ${tech.color} transition-all hover:border-white/10 hover:bg-white/[0.05]`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-3xl border border-white/5 bg-ink-800/40 p-12 glow-brand">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to manage your leads?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Start organizing your inbound leads, track conversions, and empower your sales team today.
            </p>
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/35 hover:brightness-110"
            >
              {isAuthenticated ? "Go to Dashboard" : "Create Free Account"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-xs font-bold text-white">
              S
            </div>
            <span className="font-display text-sm font-semibold text-white">Smart Leads Dashboard</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Smart Leads Dashboard. Built with the MERN Stack.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
