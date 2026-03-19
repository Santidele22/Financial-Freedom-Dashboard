'use client';

import { useState } from "react";
import DashboardHeader from "./dashboard-header";
import { UserProfile, FixedExpense, Debt } from "@/src/shared/interfaces/database";
import AnalyticsSummary from "../analytics/analytics-summary";
import IncomeCard from "../income/income-card";
import ExpensesList from "../expenses/expenses-list";
import DebtsList from "../debt/debts-list";
import { CreationModal, ModalType } from "@/src/shared/components/creation-modal";
import { calculateSafeToSpend } from "@/src/shared/lib/supabase/finance-logic";

interface DashboardViewProps {
    profile: UserProfile | null;
    fixedExpenses: FixedExpense[];
    debts: Debt[];
}

export default function DashboardView({ profile, fixedExpenses, debts }: DashboardViewProps) {
    const [modalConfig, setModalConfig] = useState<{ type: ModalType; isOpen: boolean; initialData?: any }>({
        type: null,
        isOpen: false,
        initialData: null
    });

    const { safeToSpend } = calculateSafeToSpend(
        profile?.monthly_income || 0,
        fixedExpenses,
        debts
    );

    const openModal = (type: ModalType, initialData?: any) => setModalConfig({ type, isOpen: true, initialData });
    const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false, initialData: null });

    const handleEditExpense = (expense: FixedExpense) => {
        openModal('expense', expense);
    };

    return (
        <div className="p-6 space-y-6 text-white bg-black min-h-screen">
            <DashboardHeader />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <IncomeCard
                    monthlyIncome={safeToSpend}
                    title="Disponible para gastar"
                    onAddIncome={() => openModal('income')}
                    onAddExpense={() => openModal('expense')}
                    onAddDebt={() => openModal('debt')}
                />
                <div className="md:col-span-2">
                    <AnalyticsSummary fixedExpenses={fixedExpenses} debts={debts} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <section className="space-y-4">
                    <DebtsList
                        debts={debts}
                        onEdit={(debt) => openModal('debt', debt)}
                        onDeleteSuccess={() => window.location.reload()}
                    />
                </section>

                <section className="space-y-4">
                    <ExpensesList
                        expenses={fixedExpenses}
                        onEdit={handleEditExpense}
                        onDeleteSuccess={() => {
                            // En una app real, aquí refrescaríamos los datos
                            // Por ahora, router.refresh() debería funcionar con Server Components
                            window.location.reload();
                        }}
                    />
                </section>
            </div>

            <CreationModal
                type={modalConfig.type}
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                initialData={modalConfig.initialData || { monthlyIncome: profile?.monthly_income }}
            />
        </div>
    );
}
