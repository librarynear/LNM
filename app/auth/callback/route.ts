import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  let redirectTo = new URL("/", request.url); // Default redirect to home

  if (code) {
    const supabase = await createClient();
    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("Error exchanging code:", sessionError.message);
      return NextResponse.redirect(new URL("/error", request.url));
    }

    // Get the authenticated user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      console.error("Error fetching user:", userError?.message);
      return NextResponse.redirect(new URL("/error", request.url));
    }

    const user = userData.user;

    // Check if user already exists in the "Librarian" table
    const { data: librarianProfile, error: profileError } = await supabase
      .from('Librarian')
      .select('profileCompleted, username, email')
      .eq('email', user.email)
      .single();

    if (profileError) {
      console.error("Error fetching librarian profile:", profileError.message);
    }

    // If user doesn't exist, insert them into the database
    if (!librarianProfile) {
      const { error: insertError } = await supabase.from("Librarian").insert([
        {
          id: user.id,
          email: user.email,
          username: user.user_metadata.full_name || user.user_metadata.name || "", // Required field
          password: null, // Null since password is optional for Google authentication
          profilePhoto: null, // Default to null (can be updated later)
          contactNumber: null, // Optional, so setting to null
          address: null, // Optional, so setting to null
          profileCompleted: false, // Default is false
          provider: user.app_metadata.provider || "email", // Track auth provider (default "email")
          createdAt: new Date().toISOString(), // Matches Prisma schema naming
        }
        
      ]);

      if (insertError) {
        console.error("Error inserting new librarian:", insertError.message);
      }
    }

    // Redirect to onboarding if the profile is incomplete
    if (!librarianProfile || !librarianProfile.profileCompleted) {
      redirectTo = new URL("/onboarding", request.url);
    }
  }

  return NextResponse.redirect(redirectTo);
}
