import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import type { LoginValues } from "../validations/authSchema";

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: (values: LoginValues) => login(values),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Welcome back");
      navigate("/");
    },
    onError: () => toast.error("Login failed")
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="card-surface w-full max-w-md rounded-3xl p-8">
        <div className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Welcome</p>
          <h1 className="font-display text-2xl text-white">Sign in to Smart Leads</h1>
          <p className="text-sm text-slate-300">
            Keep every deal and touchpoint organized from one workspace.
          </p>
        </div>
        <AuthForm
          mode="login"
          onSubmit={(values) => mutation.mutate(values as LoginValues)}
          isLoading={mutation.isPending}
        />
        <p className="mt-6 text-sm text-slate-300">
          New here?{" "}
          <Link className="text-brand-500" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
