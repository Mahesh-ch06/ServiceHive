import { useMutation } from "@tanstack/react-query";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPassword } from "../api/auth";
import { getErrorMessage } from "../api/client";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import toast from "react-hot-toast";

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type ResetFormValues = z.infer<typeof resetSchema>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema)
  });

  const mutation = useMutation({
    mutationFn: (values: ResetFormValues) =>
      resetPassword({ token, password: values.password }),
    onSuccess: () => {
      toast.success("Password reset successfully!");
      navigate("/login");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Reset failed. The link may have expired."))
  });

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 auth-bg">
        <div className="w-full max-w-md animate-scale-in">
          <div className="card-surface rounded-2xl p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f87171" strokeWidth="1.5">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="mt-4 font-display text-xl font-semibold text-white">
              Invalid reset link
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              This reset link is missing or invalid. Please request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20"
            >
              Request new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 auth-bg">
      <div className="w-full max-w-md animate-scale-in">
        <div className="card-surface rounded-2xl p-8 glow-brand">
          <div className="mb-8 space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-2xl font-bold text-white shadow-lg shadow-brand-500/25">
              S
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-white">
                Set new password
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Enter your new password below
              </p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit((v) => mutation.mutate(v))}>
            <Input
              label="New password"
              type="password"
              placeholder="Minimum 8 characters"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Confirm new password"
              type="password"
              placeholder="Re-enter your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full mt-2"
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Resetting...
                </span>
              ) : (
                "Reset password"
              )}
            </Button>
            <p className="text-center text-sm text-slate-400">
              <Link
                className="font-medium text-brand-500 transition-colors hover:text-brand-600"
                to="/login"
              >
                Back to sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
