import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
    "inline-flex  items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            intent: {
                income: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] ring-emerald-400",
                expense: "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] ring-rose-400",
                debt: "bg-amber-500 text-white hover:bg-amber-600 shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] ring-amber-400",
                neutral: "bg-slate-800 text-white hover:bg-slate-900 shadow-[0_4px_14px_0_rgba(30,41,59,0.39)] ring-slate-400",
            },
            importance: {
                primary: "border-transparent",
                secondary: "bg-transparent border-2 shadow-none",
                tertiary: "bg-transparent shadow-none hover:bg-slate-100",
            },
            small: {
                true: "px-3 py-1.5 text-xs",
            },
            medium: {
                true: "px-4 py-2 text-sm",
            },
            large: {
                true: "px-6 py-3 text-base",
            },
            status: {
                active: "opacity-100",
                inactive: "opacity-60",
                hover: "scale-[1.02]",
                focus: "ring-2",
                disabled: "opacity-50 cursor-not-allowed",
            }
        },
        defaultVariants: {
            intent: "neutral",
            importance: "primary",
        },
    }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    text: string;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}

export default function Button({
    text,
    intent,
    importance,
    status,
    small,
    medium,
    large,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonVariants({ intent, importance, status, small, medium, large, className })}
            {...props}
        >
            {text}
        </button>
    );
}