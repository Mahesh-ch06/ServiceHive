import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";
import Button from "../common/Button";
import { loginSchema, registerSchema } from "../../validations/authSchema";
import type { LoginValues, RegisterValues } from "../../validations/authSchema";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (values: LoginValues | RegisterValues) => void;
  isLoading?: boolean;
}

const AuthForm = ({ mode, onSubmit, isLoading }: AuthFormProps) => {
  const schema = mode === "login" ? loginSchema : registerSchema;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues | RegisterValues>({
    resolver: zodResolver(schema)
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {mode === "register" && (
        <Input
          label="Full name"
          placeholder="Ava Hart"
          error={errors.name?.message}
          {...register("name")}
        />
      )}
      <Input
        label="Email"
        type="email"
        placeholder="ava@company.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Minimum 8 characters"
        error={errors.password?.message}
        {...register("password")}
      />
      {mode === "register" && (
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          error={(errors as Record<string, { message?: string }>).confirmPassword?.message}
          {...register("confirmPassword")}
        />
      )}
      <Button type="submit" disabled={isLoading} className="w-full mt-2">
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900 border-t-transparent" />
            Working...
          </span>
        ) : mode === "login" ? (
          "Sign in"
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
