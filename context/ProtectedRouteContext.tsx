"use client";
import { getUserType, UserType } from '@/utils/supabase/getUserType';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [userRole, setUserRole] = useState<UserType>("unknown");
    const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
    useEffect(() => {
    const getUser = async () => {
      const {type : userRole , data :user} = await getUserType();
      return { userRole, user };
    }
      getUser().then(({ userRole, user }) => {
        setUserRole(userRole);
        setUser(user);
        setIsLoading(false);
      });
    }
    , []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || userRole !== requiredRole) {
    toast.error("You do not have permission to access this page.");
    router.push("/login");
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
}
