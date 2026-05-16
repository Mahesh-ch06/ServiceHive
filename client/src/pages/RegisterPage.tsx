import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm";
import { register } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import type { RegisterValues } from "../validations/authSchema";

const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: (values: RegisterValues) => register(values),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Account created");
      navigate("/");
    },
    onError: () => toast.error("Registration failed")
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="card-surface w-full max-w-md rounded-3xl p-8">
        <div className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Get started</p>
          <h1 className="font-display text-2xl text-white">Create your workspace</h1>
          <p className="text-sm text-slate-300">
            Empower your sales team with consistent follow-up and visibility.
          </p>
        </div>
        <AuthForm
          mode="register"
          onSubmit={(values) => mutation.mutate(values as RegisterValues)}
          isLoading={mutation.isPending}
        />
        <p className="mt-6 text-sm text-slate-300">
          Already have access?{" "}
          <Link className="text-brand-500" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
