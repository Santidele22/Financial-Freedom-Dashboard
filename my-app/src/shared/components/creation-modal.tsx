"use client"

import { Dialog } from "./dialog"
import IncomeForm from "@/src/modules/income/income-form"
import DebtForm from "@/src/modules/debt/debt-form"
import ExpenseForm from "@/src/modules/expenses/expense-form"
import { useRouter } from "next/navigation"

export type ModalType = "income" | "debt" | "expense" | null

interface CreationModalProps {
    type: ModalType
    isOpen: boolean
    onClose: () => void
    initialData?: any
}

export function CreationModal({ type, isOpen, onClose, initialData }: CreationModalProps) {
    const router = useRouter()

    const handleSuccess = () => {
        onClose()
        // En una app real esto dispararía un refresh de datos
        window.location.reload()
    }

    const titles = {
        income: "Actualizar Ingresos Mensuales",
        debt: initialData?.id ? "Editar Deuda" : "Agregar Nueva Deuda",
        expense: initialData?.id ? "Editar Gasto Fijo" : "Agregar Gasto Fijo"
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={type ? titles[type] : ""}
        >
            {type === "income" && (
                <IncomeForm
                    initialAmount={initialData?.monthlyIncome}
                    onSuccess={handleSuccess}
                    onCancel={onClose}
                />
            )}
            {type === "debt" && (
                <DebtForm
                    initialAmount={initialData}
                    onSuccess={handleSuccess}
                    onCancel={onClose}
                />
            )}
            {type === "expense" && (
                <ExpenseForm
                    initialData={initialData}
                    onSuccess={handleSuccess}
                    onCancel={onClose}
                />
            )}
        </Dialog>
    )
}
