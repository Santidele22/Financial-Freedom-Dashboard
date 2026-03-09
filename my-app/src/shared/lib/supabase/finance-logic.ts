export function calculateSafeToSpend(
    income: number,
    fixedExpenses: { amount: number }[],
    debts: { monthly_amount: number, status: string }[]
) {
    const totalFixed = fixedExpenses.reduce((acc, curr) => acc + curr.amount, 0);

    const totalActiveDebts = debts
        .filter(d => d.status === 'active')
        .reduce((acc, curr) => acc + curr.monthly_amount, 0);


    const safeToSpend = income - totalFixed - totalActiveDebts;

    return {
        safeToSpend,
        totalFixed,
        totalActiveDebts
    };
}