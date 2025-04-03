"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, userRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (userRole !== requiredRole) {
        router.push('/login');
        toast.error("You do not have permission to access this page.");
      }
    }
  }, [user, userRole, isLoading, router, requiredRole]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || userRole !== requiredRole) {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
}
