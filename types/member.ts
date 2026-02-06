/** Member shape used across the app (table, forms, etc.) */
export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  expiryDate: string;
  status: "active" | "inactive" | "expired";
  paymentStatus: "paid" | "unpaid";
  paymentAmount: number;
};

export interface ICreateMemberData {
  name: string;
  email?: string | null;
  phone?: string | null;
  membershipType: string;
  joinDate: string;
  expiryDate: string | null;
  status: "active" | "inactive" | "expired";
  paymentStatus: "paid" | "unpaid";
  paymentAmount: number;
}

export interface IUpdateMemberData {
  name?: string;
  email?: string | null;
  phone?: string | null;
  membershipType?: string;
  joinDate?: string;
  expiryDate?: string | null;
  status?: "active" | "inactive" | "expired";
  paymentStatus?: "paid" | "unpaid";
  paymentAmount?: number;
}

/** Raw member row from database (snake_case) */
export interface IMemberRow {
  id: number;
  member_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  membership_type: string;
  join_date: string;
  expiry_date: string | null;
  status: string;
  payment_status: string;
  payment_amount: string;
  created_at: Date;
  updated_at: Date;
}

export interface IMemberData {
  id: number;
  memberId: string;
  name: string;
  email: string | null;
  phone: string | null;
  membershipType: string;
  joinDate: string;
  expiryDate: string | null;
  status: string;
  paymentStatus: string;
  paymentAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Paginated members response */
export type MembersResponse = {
  members: Member[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
