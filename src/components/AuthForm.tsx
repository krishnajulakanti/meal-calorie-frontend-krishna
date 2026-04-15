"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  registrationSchema,
  loginSchema,
  RegisterInput,
  LoginInput,
} from "@/lib/validations";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { ApiError } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const saveCredentials = useAuthStore((state) => state.saveCredentials);
  const [isLoading, setIsLoading] = useState(false);

  const isRegister = mode === "register";
  const schema = isRegister ? registrationSchema : loginSchema;

  type FormInput = typeof isRegister extends true ? RegisterInput : LoginInput;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterInput | LoginInput>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const isSubmitDisabled = isLoading || !isValid;

  async function onSubmit(data: RegisterInput | LoginInput) {
    setIsLoading(true);
    try {
      const res = isRegister
        ? await authApi.register(data)
        : await authApi.login(data);

      saveCredentials(res.token, res.user);
      toast.success(isRegister ? "Account created successfully!" : "Welcome back!");
      router.replace("/dashboard");
    } catch (err) {
      const error = err as ApiError;

      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isRegister ? "Create an account" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {isRegister
              ? "Enter your details below to get started"
              : "Sign in to your account to continue"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    placeholder="Jane"
                    {...register("first_name" as keyof RegisterInput)}
                  />
                  <p className="text-xs font-medium text-red-500 min-h-[16px]">
                    {(errors as Record<string, { message?: string }>).first_name?.message ?? ""}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    placeholder="Smith"
                    {...register("last_name" as keyof RegisterInput)}
                  />
                  <p className="text-xs font-medium text-red-500 min-h-[16px]">
                    {(errors as Record<string, { message?: string }>).last_name?.message ?? ""}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@example.com"
                {...register("email")}
              />
              <p className="text-xs font-medium text-red-500 min-h-[16px]">
                {errors.email?.message ?? ""}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={isRegister ? "Min. 8 characters" : "Your password"}
                {...register("password")}
              />
              <p className="text-xs font-medium text-red-500 min-h-[16px]">
                {errors.password?.message ?? ""}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="border-2 border-primary" variant="default" disabled={isSubmitDisabled}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRegister ? "Creating account..." : "Signing in..."}
                </>
              ) : isRegister ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    Create one
                  </Link>
                </>
              )}
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
