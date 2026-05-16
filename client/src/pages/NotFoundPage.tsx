import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-4xl text-white">Page not found</h1>
      <p className="text-sm text-slate-300">
        The page you requested does not exist. Head back to your dashboard.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-ink-900"
      >
        Go to dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
