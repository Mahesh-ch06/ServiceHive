import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/auth";
import { getErrorMessage } from "../api/client";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: () => forgotPassword({ email }),
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Reset instructions sent!");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Something went wrong. Try again."))
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-6 auth-bg">
      <div className="w-full max-w-md animate-scale-in">
        <div className="card-surface rounded-2xl p-8 glow-brand">
          {/* Brand */}
          <div className="mb-8 space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-2xl font-bold text-white shadow-lg shadow-brand-500/25">
              S
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-white">
                Forgot password?
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {submitted
                  ? "Check your email for reset instructions"
                  : "Enter your email and we'll send you a reset link"}
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#34d399" strokeWidth="1.5">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">Email sent!</p>
                  <p className="text-xs text-slate-400">
                    If an account exists with <strong className="text-white">{email}</strong>, you&apos;ll receive a password reset link.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                >
                  Try another email
                </Button>
                <Link
                  to="/login"
                  className="text-center text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
                >
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) mutation.mutate();
              }}
            >
              <Input
                label="Email address"
                type="email"
                placeholder="ava@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                disabled={mutation.isPending || !email.trim()}
                className="w-full mt-2"
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  "Send reset link"
                )}
              </Button>
              <p className="text-center text-sm text-slate-400">
                Remember your password?{" "}
                <Link
                  className="font-medium text-brand-500 transition-colors hover:text-brand-600"
                  to="/login"
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
