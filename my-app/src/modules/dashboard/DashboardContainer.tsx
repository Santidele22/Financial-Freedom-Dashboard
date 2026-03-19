import { createClient } from "@/src/shared/lib/supabase/server";
import DashboardView from "./DashboardView";

export default async function DashboardContainer() {
    const supabase = await createClient();

    // Fetch user data
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return <div>Please log in to view your dashboard.</div>;
    }

    // Fetch profile, fixed expenses, and debts
    const [profileRes, fixedRes, debtsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('fixed_expenses').select('*').eq('user_id', user.id),
        supabase.from('debts').select('*').eq('user_id', user.id)
    ]);

    // Handle potential errors (silent for now, passing empty arrays)
    const profile = profileRes.data || null;
    const fixedExpenses = fixedRes.data || [];
    const debts = debtsRes.data || [];



    return (
        <DashboardView
            profile={profile}
            fixedExpenses={fixedExpenses}
            debts={debts}
        />
    );
}
