"use client"

import { useState } from "react"
import { createClient } from "@/src/shared/lib/supabase/client"

interface IncomeFormProps {
    initialAmount?: number
    onSuccess: () => void
    onCancel: () => void
}

export default function IncomeForm({ initialAmount = 0, onSuccess, onCancel }: IncomeFormProps) {
    const [amount, setAmount] = useState(initialAmount)
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("No user found")

            const { error } = await supabase
                .from('profiles')
                .update({ monthly_income: amount, updated_at: new Date().toISOString() })
                .eq('id', user.id)

            if (error) throw error
            onSuccess()
        } catch (error) {
            console.error("Error updating income:", error)
            alert("Error al actualizar el ingreso")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium text-zinc-400">
                    Ingreso Mensual Neto
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">$</span>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-8 pr-4 text-white font-mono focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                        placeholder="0.00"
                        required
                    />
                </div>
                <p className="text-[11px] text-zinc-500">
                    Este valor se utilizará para calcular tu capacidad de ahorro y proyecciones.
                </p>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors text-sm font-medium"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium shadow-lg shadow-emerald-900/20"
                >
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
            </div>
        </form>
    )
}
