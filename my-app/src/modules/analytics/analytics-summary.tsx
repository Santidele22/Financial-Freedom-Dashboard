import { Debt, FixedExpense } from "@/src/shared/interfaces/database";

interface AnalyticsSummaryProps {
    fixedExpenses: FixedExpense[];
    debts: Debt[];
}

export default function AnalyticsSummary({ fixedExpenses, debts }: AnalyticsSummaryProps) {
    const totalFixed = fixedExpenses?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0;
    const totalActiveDebts = debts?.filter(d => d.status === 'active').reduce((acc, curr) => acc + (curr.monthly_amount || 0), 0) || 0;

    return (
        <section className="col-span-1 md:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Resumen</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 p-4 rounded-xl">
                    <p className="text-sm text-zinc-400 capitalize">Gastos Fijos</p>
                    <p className="text-2xl font-bold">${totalFixed.toLocaleString()}</p>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-xl">
                    <p className="text-sm text-zinc-400">Deudas Activas</p>
                    <p className="text-2xl font-bold">${totalActiveDebts.toLocaleString()}</p>
                </div>
            </div>
        </section>
    );
}
