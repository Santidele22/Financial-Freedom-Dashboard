'use client';

import DashboardHeader from "./dashboard-header";
import { UserProfile, FixedExpense, Debt } from "@/src/shared/interfaces/database";
import AnalyticsSummary from "../analytics/analytics-summary";
import IncomeCard from "../income/income-card";
import ExpensesList from "../expenses/expenses-list";
import DebtsList from "../debt/debts-list";

interface DashboardViewProps {
    profile: UserProfile | null;
    fixedExpenses: FixedExpense[];
    debts: Debt[];
}

export default function DashboardView({ profile, fixedExpenses, debts }: DashboardViewProps) {
    return (
        <div className="p-6 space-y-6 text-white bg-black min-h-screen">
            <DashboardHeader />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <IncomeCard monthlyIncome={profile?.monthly_income || 0} />
                <AnalyticsSummary fixedExpenses={fixedExpenses} debts={debts} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <ExpensesList expenses={fixedExpenses} />
                <DebtsList debts={debts} />
            </div>
        </div>
    );
}
