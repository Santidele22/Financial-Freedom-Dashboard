import { DebtStatus } from "../types/database";

export type UserProfile = {
    id: string;
    email: string | null;
    monthly_income: number;
    current_balance: number;
    billing_closing_day: number;
    updated_at: string;
};

export type FixedExpense = {
    id: string;
    user_id: string;
    name: string;
    amount: number;
    due_day: number;
    created_at: string;
};


export type Debt = {
    id: string;
    user_id: string;
    name: string;
    total_amount: number;
    total_installments: number;
    remaining_installments: number;
    monthly_amount: number;
    is_credit: boolean;
    status: DebtStatus;
    start_date: string;
    created_at: string;
};

export type AppNotification = {
    id: string;
    user_id: string;
    message: string;
    is_read: boolean;
    type: 'success' | 'info' | 'warning';
    created_at: string;
};