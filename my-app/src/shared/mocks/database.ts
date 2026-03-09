import { AppNotification, Debt, FixedExpense, UserProfile } from "../interfaces/database";

// 1. Perfil del Usuario
export const MOCK_PROFILE: UserProfile = {
    id: "user-123",
    email: "usuario@ejemplo.com",
    monthly_income: 350000, // Ejemplo en moneda local
    current_balance: 45200.50,
    billing_closing_day: 25,
    updated_at: new Date().toISOString(),
};

// 2. Gastos Fijos (Salidas mensuales constantes)
export const MOCK_FIXED_EXPENSES: FixedExpense[] = [
    {
        id: "fx-1",
        user_id: "user-123",
        name: "Alquiler",
        amount: 120000,
        due_day: 5,
        created_at: new Date().toISOString(),
    },
    {
        id: "fx-2",
        user_id: "user-123",
        name: "Internet & Celular",
        amount: 15000,
        due_day: 10,
        created_at: new Date().toISOString(),
    },
    {
        id: "fx-3",
        user_id: "user-123",
        name: "Suscripciones (Netflix/Spotify)",
        amount: 4500,
        due_day: 15,
        created_at: new Date().toISOString(),
    }
];

// 3. Deudas (Motor de Cuotas)
export const MOCK_DEBTS: Debt[] = [
    {
        id: "db-1",
        user_id: "user-123",
        name: "Henry (Curso de Programación)",
        total_amount: 50000,
        total_installments: 12,
        remaining_installments: 1, // Activará la notificación de "última cuota"
        monthly_amount: 4166.66,
        is_credit: false,
        status: "active",
        start_date: "2023-04-01",
        created_at: new Date().toISOString(),
    },
    {
        id: "db-2",
        user_id: "user-123",
        name: "MacBook Pro M2",
        total_amount: 240000,
        total_installments: 24,
        remaining_installments: 18,
        monthly_amount: 10000,
        is_credit: true,
        status: "active",
        start_date: "2023-10-15",
        created_at: new Date().toISOString(),
    },
    {
        id: "db-3",
        user_id: "user-123",
        name: "Gimnasio Anual",
        total_amount: 60000,
        total_installments: 12,
        remaining_installments: 6,
        monthly_amount: 5000,
        is_credit: false,
        status: "active",
        start_date: "2023-12-01",
        created_at: new Date().toISOString(),
    }
];

// 4. Notificaciones
export const MOCK_NOTIFICATIONS: AppNotification[] = [
    {
        id: "nt-1",
        user_id: "user-123",
        message: "¡Buenas noticias! El mes que viene terminas de pagar Henry :)",
        is_read: false,
        type: "success",
        created_at: new Date().toISOString(),
    },
    {
        id: "nt-2",
        user_id: "user-123",
        message: "Tu presupuesto libre aumentó un 5% este mes.",
        is_read: true,
        type: "info",
        created_at: new Date().toISOString(),
    }
];