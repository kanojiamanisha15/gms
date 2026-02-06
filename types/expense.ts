/** Expense shape used across the app (table, forms, etc.) */
export type ExpenseStatus = "paid" | "pending" | "overdue";

export interface ICreateExpenseData {
  category: string;
  description?: string | null;
  amount: number;
  date: string;
  status: ExpenseStatus;
  vendor?: string | null;
}

export interface IUpdateExpenseData {
  category?: string;
  description?: string | null;
  amount?: number;
  date?: string;
  status?: ExpenseStatus;
  vendor?: string | null;
}

/** Raw expense row from database (snake_case) */
export interface IExpenseRow {
  id: number;
  category: string;
  description: string | null;
  amount: string;
  date: string;
  status: string;
  vendor: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface IExpenseData {
  id: number;
  category: string;
  description: string | null;
  amount: number;
  date: string;
  status: ExpenseStatus;
  vendor: string | null;
  createdAt?: string;
  updatedAt?: string;
}
