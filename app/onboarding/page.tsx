'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import LibrarianOnboarding from '@/components/profile/LibrarianOnboarding';
import { Loader2 } from 'lucide-react'; // Assuming you have a loader icon

export default function Onboarding() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading
      const supabase = createClient();
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        console.error('Error fetching authenticated user:', authError);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('Librarian') // Replace 'Librarian' with your table name
        .select('username, email')
        .eq('email', authUser.email) // Filter by the authenticated user's email
        .single();

      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(data);
      }
      setLoading(false); // Stop loading
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">No user data found.</p>
      </div>
    );
  }

  return <LibrarianOnboarding user={user} />;
}