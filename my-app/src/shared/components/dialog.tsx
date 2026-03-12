"use client"

import React, { useEffect } from "react"
import { cx } from "class-variance-authority"
import { X } from "lucide-react"

interface DialogProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    className?: string
}

export function Dialog({ isOpen, onClose, title, children, className }: DialogProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            document.body.style.overflow = "hidden"
            window.addEventListener("keydown", handleEscape)
        }
        return () => {
            document.body.style.overflow = "unset"
            window.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className={cx(
                "relative z-10 w-full max-w-lg transform overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-all",
                "animate-in fade-in zoom-in duration-200",
                className
            )}>
                <div className="flex items-center justify-between mb-6">
                    {title && <h2 className="text-xl font-semibold text-white tracking-tight">{title}</h2>}
                    <button 
                        onClick={onClose}
                        className="rounded-full p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
                    >
                        <X size={20} />
                        <span className="sr-only">Cerrar</span>
                    </button>
                </div>
                
                {children}
            </div>
        </div>
    )
}
