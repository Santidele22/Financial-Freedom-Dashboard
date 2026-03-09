interface IncomeCardProps {
    monthlyIncome: number;
}

export default function IncomeCard({ monthlyIncome }: IncomeCardProps) {
    return (
        <section className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-lg font-medium mb-4">Income</h3>
            <p className="text-3xl font-bold text-green-400">${monthlyIncome?.toLocaleString() || '0'}</p>
            <p className="text-xs text-zinc-500 mt-2">Monthly base income</p>
        </section>
    );
}
