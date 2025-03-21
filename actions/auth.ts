"use server"

import { createClient } from "@/app/utils/supabase/server";
import { handleError } from "@/lib/utils";

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

export const signUpAction = async (email: string, password: string) => {
    try {
      const { auth } = await createClient();
  
      const { data, error } = await auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      else {
        const userId = data.user?.id;
        if (!userId) throw new Error("Error signing up");
        else {
          const { error } = await auth.signInWithPassword({
            email,
            password,
          });
          //have to add prisma logic
          if (error) throw error;
          else return { errorMessage: null };
        }
      }
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