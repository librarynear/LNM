"use client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { loginAction, signUpAction } from "@/actions/auth";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

interface AuthFormProps {
  type: "login" | "signUp";
  userType: "student" | "librarian" | "admin";
}

function AuthForm({ type, userType }: AuthFormProps) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      
      if (isLoginForm) {
        // Handle login
        errorMessage = (await loginAction(email, password)).errorMessage;
      } else {
        // Handle signup
        const username = ((userType === "admin") ||(userType= "librarian")) ? (formData.get("username") as string) : undefined;
        errorMessage = (await signUpAction(email, userType, password, username,)).errorMessage;
      }

      // Show error toast if there's an error
      if (errorMessage) {
        toast(errorMessage);
      } else {
        router.push(`/`);
        if(isLoginForm) toast("Welcome back!");
        else
        toast("Confirmation email sent. Please verify your email address to continue.");
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
      {(userType === "admin" || userType === "librarian") && (type === "signUp") && (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
              type="text"
              required
              disabled={isPending}
            />
          </div>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          />
        </div>

      </CardContent>
      
      <CardFooter className="mt-4 flex flex-col gap-6">
      {(userType === "student" || userType === "librarian") &&(type == "login")&& (
          <SignInWithGoogleButton />
        )}
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${
              isPending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
