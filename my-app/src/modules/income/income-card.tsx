import Button from "@/src/shared/components/Button";

interface IncomeCardProps {
    monthlyIncome: number;
    title?: string;
    onAddIncome?: () => void;
    onAddExpense?: () => void;
    onAddDebt?: () => void;
}

export default function IncomeCard({ 
    monthlyIncome, 
    title = "Ingresos", 
    onAddIncome, 
    onAddExpense, 
    onAddDebt 
}: IncomeCardProps) {
    return (
        <section className="flex flex-col gap-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm h-full">
            <h3 className="text-lg font-medium mb-4">{title}</h3>
            <p className="text-3xl font-bold text-green-400">${monthlyIncome?.toLocaleString() || '0'}</p>
            <div className="flex gap-2 mt-auto pt-4">
                <Button
                    text="Agregar ingreso"
                    intent="income"
                    importance="primary"
                    small
                    onClick={onAddIncome}
                />
                <Button
                    text="Ingresar gasto"
                    intent="expense"
                    importance="primary"
                    small
                    onClick={onAddExpense}
                />
                <Button
                    text="Ingresar deuda"
                    intent="debt"
                    importance="primary"
                    small
                    onClick={onAddDebt}
                />
            </div>
        </section>
    );
}
