import { Debt } from "@/src/shared/interfaces/database";
import { ProgressBar } from "@/src/shared/components/progressBar";

interface DebtsListProps {
    debts: Debt[];
}

export default function DebtsList({ debts }: DebtsListProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-medium">Deudas Activas</h3>
            <ul className="space-y-3">
                {debts?.filter(d => d.status === 'active').slice(0, 5).map((debt, i) => {
                    const paidInstallments = debt.total_installments - debt.remaining_installments;
                    const progress = (paidInstallments / debt.total_installments) * 100;

                    return (
                        <li key={i} className="space-y-2 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{debt.name || 'Deuda'}</span>
                                <div className="text-right">
                                    <p className="font-mono text-red-400">-${debt.monthly_amount?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <ProgressBar
                                    value={progress}
                                    variant="error"
                                    className="h-1.5"
                                />
                                <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
                                    <span>{paidInstallments} / {debt.total_installments} cuotas</span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
