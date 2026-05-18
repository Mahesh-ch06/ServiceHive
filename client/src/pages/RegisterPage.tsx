import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm";
import { register } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { getErrorMessage } from "../api/client";
import type { RegisterValues } from "../validations/authSchema";

const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: (values: RegisterValues) => {
      // Strip confirmPassword before sending to API
      const { confirmPassword: _, ...payload } = values;
      return register(payload);
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Registration failed. Please try again."))
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
                Create your workspace
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Start managing leads with your team today
              </p>
            </div>
          </div>

          <AuthForm
            mode="register"
            onSubmit={(values) => mutation.mutate(values as RegisterValues)}
            isLoading={mutation.isPending}
          />

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link className="font-medium text-brand-500 transition-colors hover:text-brand-600" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
