"use client"

import { useState } from "react"
import { createClient } from "@/src/shared/lib/supabase/client"

import { FixedExpense } from "@/src/shared/interfaces/database"

interface ExpenseFormProps {
    onSuccess: () => void
    onCancel: () => void
    initialData?: FixedExpense
}

export default function ExpenseForm({ onSuccess, onCancel, initialData }: ExpenseFormProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        amount: initialData?.amount?.toString() || "",
        due_day: initialData?.due_day?.toString() || ""
    })

    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("No user found")

            const expenseData = {
                user_id: user.id,
                name: formData.name,
                amount: Number(formData.amount),
                due_day: Number(formData.due_day)
            }

            let result;
            if (initialData?.id) {
                result = await supabase
                    .from('fixed_expenses')
                    .update(expenseData)
                    .eq('id', initialData.id)
            } else {
                result = await supabase
                    .from('fixed_expenses')
                    .insert(expenseData)
            }

            if (result.error) throw result.error
            onSuccess()
        } catch (error) {
            console.error("Error saving expense:", error)
            alert("Error al guardar el gasto")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Nombre del Gasto</label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500/50 outline-none"
                    placeholder="Ej: Alquiler, Internet, Gimnasio..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Monto Mensual</label>
                    <input
                        type="number"
                        required
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white font-mono"
                        placeholder="0.00"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Día de Vencimiento</label>
                    <input
                        type="number"
                        required
                        min="1"
                        max="31"
                        value={formData.due_day}
                        onChange={(e) => setFormData({ ...formData, due_day: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white"
                        placeholder="1 a 31"
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 hover:bg-zinc-800 text-sm font-medium"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 text-sm font-medium shadow-lg shadow-blue-900/20"
                >
                    {loading ? "Guardando..." : (initialData ? "Guardar Cambios" : "Crear Gasto")}
                </button>
            </div>
        </form>
    )
}
