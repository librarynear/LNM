"use server"

import { createClient } from "@/utils/supabase/server";
import { handleError } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    else return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpAction = async (
  email: string,
  role: 'student' | 'librarian' | 'admin',
  password?: string,
  username?: string
) => {
  try {
    const { auth } = await createClient();
    const prisma = new PrismaClient();

    if (role === 'admin') {
      // Admin requires email, password, and username
      if (!password || !username) {
        throw new Error("Admin must provide email, password, and username");
      }

      // Sign up with email and password (Admin only)
      const { data, error } = await auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      const userId = data.user?.id;
      if (!userId) throw new Error("Error signing up");

      // Create Admin in DB
      await prisma.admin.create({
        data: {
          id: userId,
          email,
          username,
          password,
        },
      });

    } else if (role === 'student' || role === 'librarian') {
      // Email/password sign-up flow for Student/Librarian
      if (!password) {
        throw new Error("Password is required for manual sign-up");
      }

      const { data, error } = await auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      const userId = data.user?.id;
      if (!userId) throw new Error("Error signing up");

      // Create Student/Librarian in DB with password
      if (role === 'student') {
        await prisma.student.create({
          data: {
            id: userId,
            email,
            password,
            username,
          },
        });
      } else {
        await prisma.librarian.create({
          data: {
            id: userId,
            email,
            password,
            username,
          },
        });
      }
    }

    await prisma.$disconnect();
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};



export const logOutAction = async () => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();
    if (error) throw error;
    else return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export async function signInWithGoogle() {
  try {
    console.log("Reached 2");
    const client = await createClient();
    if (!client || !client.auth) {
      console.error("Auth client not properly initialized");
      return;
    }
    console.log("Reached 3");
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    console.log("Reached 4");
    if (error) {
      console.error("OAuth error:", error);
      return;
    }
    console.log("Reached 5");
    return data;
  } catch (err) {
    console.error("SignIn error:", err);
    throw err;
  }
}

