"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  userRole: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchUserRole = async (email: string) => {
    // Check Admin table
    const { data: adminData } = await supabase
      .from('Admin')
      .select('role')
      .eq('email', email)
      .single();
    
    if (adminData) return adminData.role;
    
    // Check Librarian table
    const { data: librarianData } = await supabase
      .from('Librarian')
      .select('role')
      .eq('email', email)
      .single();
    
    if (librarianData) return librarianData.role;
    
    // Check Student table
    const { data: studentData } = await supabase
      .from('Student')
      .select('role')
      .eq('email', email)
      .single();
    
    if (studentData) return studentData.role;
    
    return "user"; // Default role if not found in any table
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        // Fetch role from database based on email
        const role = await fetchUserRole(session.user.email!);
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole(null);
      }
      
      setIsLoading(false);
    };

    fetchUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          // Fetch role from database based on email
          const role = await fetchUserRole(session.user.email!);
          setUserRole(role);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, userRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);