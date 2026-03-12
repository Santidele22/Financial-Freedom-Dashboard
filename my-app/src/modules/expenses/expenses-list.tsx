import { FixedExpense } from "@/src/shared/interfaces/database";
import Button from "@/src/shared/components/Button";
import { Pencil, Trash2 } from "lucide-react";

import { createClient } from "@/src/shared/lib/supabase/client";

interface ExpensesListProps {
    expenses: FixedExpense[];
    onEdit: (expense: FixedExpense) => void;
    onDeleteSuccess: () => void;
}

export default function ExpensesList({ expenses, onEdit, onDeleteSuccess }: ExpensesListProps) {
    const supabase = createClient();

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres borrar este gasto?")) return;

        try {
            const { error } = await supabase
                .from('fixed_expenses')
                .delete()
                .eq('id', id);

            if (error) throw error;
            onDeleteSuccess();
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert("Error al borrar el gasto");
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-medium">Gastos Fijos</h3>
            <ul className="space-y-2">
                {expenses?.slice(0, 5).map((expense, i) => (
                    <li key={i} className="flex justify-between items-center bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                        <div className="flex flex-col">
                            <span className="font-medium text-zinc-100">{expense.name || 'Gasto'}</span>
                            <span className="text-xs text-zinc-500">Gasto recurrente</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="font-mono text-rose-400 font-semibold">-${expense.amount?.toLocaleString()}</span>
                            <div className="flex items-center gap-2 transition-opacity">
                                <Button
                                    importance="tertiary"
                                    small
                                    title="Editar"
                                    className="p-1.5 text-zinc-400 hover:text-white"
                                    onClick={() => onEdit(expense)}
                                >
                                    <Pencil size={18} />
                                </Button>
                                <Button
                                    importance="tertiary"
                                    small
                                    title="Borrar"
                                    className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10"
                                    onClick={() => handleDelete(expense.id)}
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

