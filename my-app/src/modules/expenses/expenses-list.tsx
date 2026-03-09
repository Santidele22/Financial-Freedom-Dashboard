import { FixedExpense } from "@/src/shared/interfaces/database";

interface ExpensesListProps {
    expenses: FixedExpense[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-medium">Recent Expenses</h3>
            <ul className="space-y-2">
                {expenses?.slice(0, 5).map((expense, i) => (
                    <li key={i} className="flex justify-between items-center bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50">
                        <span>{expense.name || 'Expense'}</span>
                        <span className="font-mono text-rust-400">-${expense.amount?.toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
