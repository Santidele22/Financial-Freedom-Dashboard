'use client';

import { createClient } from '@/src/shared/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push('/auth');
    };

    return (
        <header className="flex justify-end p-4 bg-transparent">
            <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
                Cerrar sesión
            </button>
        </header>
    );
}
