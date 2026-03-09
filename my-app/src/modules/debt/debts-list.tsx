import { Debt } from "@/src/shared/interfaces/database";

interface DebtsListProps {
    debts: Debt[];
}

export default function DebtsList({ debts }: DebtsListProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-medium">Active Debts</h3>
            <ul className="space-y-2">
                {debts?.filter(d => d.status === 'active').slice(0, 5).map((debt, i) => (
                    <li key={i} className="flex justify-between items-center bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50">
                        <span>{debt.remaining_installments || 'Debt'}</span>
                        <div className="text-right">
                            <p className="font-mono text-red-400">-${debt.monthly_amount?.toLocaleString()}</p>
                            <p className="text-[10px] text-zinc-500">Remaining: ${debt.total_amount?.toLocaleString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
