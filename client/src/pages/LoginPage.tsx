import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { getErrorMessage } from "../api/client";
import type { LoginValues } from "../validations/authSchema";

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: (values: LoginValues) => login(values),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Login failed. Please check your credentials."))
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
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Sign in to your Smart Leads workspace
              </p>
            </div>
          </div>

          <AuthForm
            mode="login"
            onSubmit={(values) => mutation.mutate(values as LoginValues)}
            isLoading={mutation.isPending}
          />

          <div className="mt-4 text-center">
            <Link
              className="text-xs text-slate-500 transition-colors hover:text-brand-500"
              to="/forgot-password"
            >
              Forgot your password?
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link className="font-medium text-brand-500 transition-colors hover:text-brand-600" to="/register">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
