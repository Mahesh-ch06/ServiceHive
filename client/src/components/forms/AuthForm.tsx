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
  const { register, handleSubmit, formState } = useForm<
    LoginValues | RegisterValues
  >({
    resolver: zodResolver(schema)
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {mode === "register" && (
        <Input
          label="Full name"
          placeholder="Ava Hart"
          error={formState.errors.name?.message}
          {...register("name")}
        />
      )}
      <Input
        label="Email"
        placeholder="ava@company.com"
        error={formState.errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Minimum 8 characters"
        error={formState.errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Working..." : mode === "login" ? "Login" : "Create account"}
      </Button>
    </form>
  );
};

export default AuthForm;
