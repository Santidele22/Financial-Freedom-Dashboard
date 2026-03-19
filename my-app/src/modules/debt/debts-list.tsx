import { Debt } from "@/src/shared/interfaces/database";
import { ProgressBar } from "@/src/shared/components/progressBar";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/src/shared/components/Button";
import { createClient } from "@/src/shared/lib/supabase/client";

interface DebtsListProps {
    debts: Debt[];
    onEdit: (debt: Debt) => void;
    onDeleteSuccess: () => void;
}

export default function DebtsList({ debts, onEdit, onDeleteSuccess }: DebtsListProps) {
    const supabase = createClient();

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres borrar esta deuda?")) return;

        try {
            const { error } = await supabase
                .from('debts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            onDeleteSuccess();
        } catch (error) {
            console.error("Error deleting debt:", error);
            alert("Error al borrar la deuda");
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-medium">Deudas Activas</h3>
            <ul className="space-y-3">
                {debts?.filter(d => d.status === 'active').slice(0, 5).map((debt, i) => {
                    const paidInstallments = debt.total_installments - debt.remaining_installments;
                    const progress = (paidInstallments / debt.total_installments) * 100;

                    return (
                        <li key={i} className="space-y-2 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <span className="font-medium text-zinc-100">{debt.name || 'Deuda'}</span>
                                    <span className="text-xs text-zinc-500">Préstamo / Crédito</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-mono text-red-400 font-semibold">-${debt.monthly_amount?.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            importance="tertiary"
                                            small
                                            title="Editar"
                                            className="p-1.5 text-zinc-400 hover:text-white"
                                            onClick={() => onEdit(debt)}
                                        >
                                            <Pencil size={18} />
                                        </Button>
                                        <Button
                                            importance="tertiary"
                                            small
                                            title="Borrar"
                                            className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                                            onClick={() => handleDelete(debt.id)}
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
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
                                    <span>{Math.round(progress)}% pagado</span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
