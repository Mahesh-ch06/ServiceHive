import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center auth-bg">
      <div className="animate-float">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-500/10">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ff7a1a" strokeWidth="1.5">
            <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
      </div>
      <div className="space-y-2 animate-slide-up">
        <p className="text-7xl font-bold gradient-text font-display">404</p>
        <h1 className="font-display text-2xl font-semibold text-white">Page not found</h1>
        <p className="max-w-sm text-sm text-slate-400">
          The page you requested doesn&apos;t exist or has been moved. Head back to your dashboard.
        </p>
      </div>
      <Link
        to="/dashboard"
        className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:shadow-brand-500/30 hover:brightness-110 animate-fade-in"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
