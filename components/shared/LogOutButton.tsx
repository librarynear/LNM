"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/auth";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

type LogOutButtonProps = {
  onLogout?: () => void;
};

function LogOutButton({ onLogout }: LogOutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    try {
      // First, trigger the server action
      const { errorMessage } = await logOutAction();

      if (!errorMessage) {
        // If successful, notify the parent component immediately
        if (onLogout) {
          onLogout();
        }

        // Also force a client-side signout to ensure consistency
        const supabase = createClient();
        await supabase.auth.signOut();

        // Force a refresh to update server components
        router.refresh();
        
        // Navigate to the homepage with toast parameter
        router.push(`/?toastType=logOut`);
      } else {
        toast("Error", {
          description: errorMessage,
          duration: 3000
        });
      }
    } catch (error) {
      toast("Error", {
        description: "An unexpected error occurred",
        duration: 3000
      });
      console.error("Logout error:", error);
    }

    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogOut}
      disabled={loading}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;