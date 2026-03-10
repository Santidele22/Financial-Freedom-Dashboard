import Button from "@/src/shared/components/Button";

interface IncomeCardProps {
    monthlyIncome: number;
}

export default function IncomeCard({ monthlyIncome }: IncomeCardProps) {
    return (
        <section className="flex flex-col gap-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-lg font-medium mb-4">Ingresos</h3>
            <p className="text-3xl font-bold text-green-400">${monthlyIncome?.toLocaleString() || '0'}</p>
            <p className="text-xs text-zinc-500 mt-2">Ingreso base mensual</p>
            <div className="flex gap-2">
                <Button text="Agregar Ingreso" intent="income" importance="primary" small />
                <Button text="Agregar Gasto" intent="expense" importance="primary" small />
                <Button text="Agregar Deuda" intent="debt" importance="primary" small />
            </div>
        </section>
    );
}
