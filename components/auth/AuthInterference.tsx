"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { CardContent, CardHeader, CardTitle } from "../ui/card";

interface AuthInterferenceProps {
  type: "login" | "signUp";
}

function AuthInterference({ type }: AuthInterferenceProps) {
  const router = useRouter();

  const handleRedirect = (userType: "student" | "librarian") => {
    if (type === "login") {
      router.push(`login/${userType}`);
    } else {
      router.push(`sign-up/${userType}`);
    }
  };

  return (
    <CardContent className="grid w-full items-center gap-4 mt-40">
      <div className="flex flex-col items-center justify-center gap-6 p-6 bg-gray-50 rounded-lg shadow-md max-w-lg mx-auto">
        <CardHeader className="mb-4 text-3xl">
          {type === "login" ? "Login as" : "Sign Up as"}
        </CardHeader>
        <CardTitle className="text-sm text-gray-600 mb-4">
          Choose your role to {type === "login" ? "log in" : "sign up"}.
        </CardTitle>
        <div className="flex justify-center gap-4 w-full">
          <Button
            className="px-6 py-3 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300 rounded-md shadow-sm"
            onClick={() => handleRedirect("student")}
          >
            {type === "login" ? "Student Login" : "Student Sign Up"}
          </Button>
          <Button
            className="px-6 py-3 bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 rounded-md shadow-sm"
            onClick={() => handleRedirect("librarian")}
          >
            {type === "login" ? "Librarian Login" : "Librarian Sign Up"}
          </Button>
        </div>
        
        {/* Additional Line with Link */}
        <p className="text-sm text-gray-600 mt-4">
          {type === "login" ? "Don't have an account? " : "Already have an account? "}
          <Link href={type === "login" ? "/sign-up" : "/login"} className="text-blue-600 hover:underline">
            {type === "login" ? "Sign up here" : "Log in here"}
          </Link>
        </p>
      </div>
    </CardContent>
  );
}

export default AuthInterference;
