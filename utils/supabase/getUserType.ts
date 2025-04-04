import { createClient } from "@/utils/supabase/client";

export type UserType = "librarian" | "student" | "admin" | "unknown" | null;

export async function getUserType(): Promise<{ type: UserType; data: any | null }> {
  const supabase = createClient();

  try {
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Error fetching authenticated user:", authError);
      return { type: "unknown", data: null };
    }

    const userId = user.id;

    // Check if the user is a librarian
    const { data: librarian, error: librarianError } = await supabase
      .from("Librarian")
      .select("*")
      .eq("id", userId)
      .single();

    if (librarian) {
      return { type: "librarian", data: librarian };
    }

    // Check if the user is a student
    const { data: student, error: studentError } = await supabase
      .from("Student")
      .select("*")
      .eq("id", userId)
      .single();

    if (student) {
      return { type: "student", data: student };
    }

    // Check if the user is an admin
    const { data: admin, error: adminError } = await supabase
      .from("Admin")
      .select("*")
      .eq("id", userId)
      .single();

    if (admin) {
      return { type: "admin", data: admin };
    }

    // If no match is found
    return { type: "unknown", data: null };
  } catch (error) {
    console.error("Error determining user type:", error);
    return { type: "unknown", data: null };
  }
}