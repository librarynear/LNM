"use client";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client';
import React from "react";

const SignInWithGoogleButton = () => {
  const handleSignIn = async () => {
    try {
      const supabase = createClient();
      
      // This will use the current URL (localhost, Netlify, or Vercel)
      const redirectTo = `${window.location.origin}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      
      if (error) {
        console.error("OAuth error:", error);
        return;
      }
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