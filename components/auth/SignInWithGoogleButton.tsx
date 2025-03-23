"use client";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client';
import React from "react";

const SignInWithGoogleButton = () => {
  const handleSignIn = async () => {
    try {
      console.log("Reached 1");
      const supabase = createClient();
      console.log("Reached 2");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      
      console.log("Reached 3");
      if (error) {
        console.error("OAuth error:", error);
        return;
      }
      console.log("Reached 4");
    } catch (err) {
      console.error("SignIn error:", err);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleSignIn}
    >
      Login with Google
    </Button>
  );
};

export default SignInWithGoogleButton;