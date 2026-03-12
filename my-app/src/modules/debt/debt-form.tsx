"use client"

import { useState } from "react"
import { createClient } from "@/src/shared/lib/supabase/client"

interface DebtFormProps {
    onSuccess: () => void
    onCancel: () => void
}

export default function DebtForm({ onSuccess, onCancel }: DebtFormProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        total_amount: "",
        total_installments: "",
        remaining_installments: "",
        monthly_amount: "",
        is_credit: false
    })

    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("No user found")

            const { error } = await supabase
                .from('debts')
                .insert({
                    user_id: user.id,
                    name: formData.name,
                    total_amount: Number(formData.total_amount),
                    total_installments: Number(formData.total_installments),
                    remaining_installments: Number(formData.remaining_installments),
                    monthly_amount: Number(formData.monthly_amount),
                    is_credit: formData.is_credit,
                    status: 'active',
                    start_date: new Date().toISOString()
                })

            if (error) throw error
            onSuccess()
        } catch (error) {
            console.error("Error creating debt:", error)
            alert("Error al crear la deuda")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Nombre de la Deuda</label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500/50 outline-none"
                    placeholder="Ej: Préstamo Personal, Tarjeta Visa..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Monto Total</label>
                    <input
                        type="number"
                        required
                        value={formData.total_amount}
                        onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white font-mono"
                        placeholder="0.00"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Cuota Mensual</label>
                    <input
                        type="number"
                        required
                        value={formData.monthly_amount}
                        onChange={(e) => setFormData({ ...formData, monthly_amount: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white font-mono"
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Cuotas Totales</label>
                    <input
                        type="number"
                        required
                        value={formData.total_installments}
                        onChange={(e) => setFormData({ ...formData, total_installments: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white"
                        placeholder="12"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Cuotas Restantes</label>
                    <input
                        type="number"
                        required
                        value={formData.remaining_installments}
                        onChange={(e) => setFormData({ ...formData, remaining_installments: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white"
                        placeholder="8"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
                <input
                    type="checkbox"
                    id="is_credit"
                    checked={formData.is_credit}
                    onChange={(e) => setFormData({ ...formData, is_credit: e.target.checked })}
                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-red-600 focus:ring-red-500/50"
                />
                <label htmlFor="is_credit" className="text-sm text-zinc-300">¿Es un consumo de Tarjeta de Crédito?</label>
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
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 text-sm font-medium shadow-lg shadow-red-900/20"
                >
                    {loading ? "Creando..." : "Crear Deuda"}
                </button>
            </div>
        </form>
    )
}
