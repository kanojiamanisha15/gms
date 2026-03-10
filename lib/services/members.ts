import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  ICreateMemberData,
  IMemberData,
  IUpdateMemberData,
} from "@/types";

type MembersListResponse = {
  success: boolean;
  data?: {
    members: IMemberData[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  error?: string;
};

type MemberByIdResponse = {
  success: boolean;
  data?: { member: IMemberData };
  error?: string;
};

// GET /api/members - Get all members with pagination and sorting
export const doGetMembers = async (params?: {
  search?: string;
  status?: string;
  paymentStatus?: string;
  membershipType?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): Promise<{
  members: IMemberData[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}> => {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;

  const queryParams: Record<string, string> = {
    page: page.toString(),
    limit: limit.toString(),
  };
  if (params?.search?.trim()) queryParams.search = params.search.trim();
  if (params?.status?.trim()) queryParams.status = params.status.trim();
  if (params?.paymentStatus?.trim()) queryParams.paymentStatus = params.paymentStatus.trim();
  if (params?.membershipType?.trim()) queryParams.membershipType = params.membershipType.trim();
  if (params?.sortBy) queryParams.sortBy = params.sortBy;
  if (params?.sortOrder) queryParams.sortOrder = params.sortOrder;

  const response = await getRequest<MembersListResponse>(
    API_ENDPOINTS.MEMBERS,
    queryParams
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to fetch members");
  }

  const data = response.data!;
  return {
    members: data.members ?? [],
    page: data.page,
    limit: data.limit,
    total: data.total,
    totalPages: data.totalPages,
    hasNextPage: data.hasNextPage,
    hasPreviousPage: data.hasPreviousPage,
  };
};

// GET /api/members/expiring - Get members expiring in a given month/year
export type ExpiringMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  expirationDate: string;
  daysRemaining: number;
};

type ExpiringMembersResponse = {
  success: boolean;
  data?: { members: ExpiringMember[] };
  error?: string;
};

export const doGetExpiringMembers = async (params: {
  month: number;
  year: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): Promise<ExpiringMember[]> => {
  const queryParams: Record<string, string> = {
    month: params.month.toString(),
    year: params.year.toString(),
  };
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

  const response = await getRequest<ExpiringMembersResponse>(
    API_ENDPOINTS.MEMBERS_EXPIRING,
    queryParams
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to fetch expiring members");
  }

  return response.data?.members ?? [];
};

// GET /api/members/:id - Get member by ID
export const doGetMemberById = async (
  memberId: string,
  options?: { signal?: AbortSignal }
): Promise<IMemberData> => {
  const response = await getRequest<MemberByIdResponse>(
    `${API_ENDPOINTS.MEMBERS}/${memberId}`,
    undefined,
    options
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to fetch member");
  }

  return response.data!.member;
};

// POST /api/members - Create member
export const doCreateMember = async (
  memberData: ICreateMemberData
): Promise<{ success: boolean; data?: { member: IMemberData }; error?: string }> => {
  const response = await postRequest<MemberByIdResponse>(
    API_ENDPOINTS.MEMBERS,
    {
      name: memberData.name.trim(),
      email: memberData.email?.trim() || null,
      phone: memberData.phone?.trim() || null,
      membershipType: memberData.membershipType,
      joinDate: memberData.joinDate,
      expiryDate: memberData.expiryDate,
      status: memberData.status,
      paymentStatus: memberData.paymentStatus,
      paymentAmount: memberData.paymentAmount,
    }
  );
  return response;
};

// PUT /api/members/:id - Update member
export const doUpdateMember = async (
  memberId: string,
  memberData: IUpdateMemberData
): Promise<{ success: boolean; data?: { member: IMemberData }; error?: string }> => {
  const response = await putRequest<MemberByIdResponse>(
    `${API_ENDPOINTS.MEMBERS}/${memberId}`,
    memberData
  );
  return response;
};

// DELETE /api/members/:id - Delete member
export const doDeleteMember = async (
  memberId: string
): Promise<{ success: boolean; error?: string }> => {
  const response = await deleteRequest<{ success: boolean; error?: string }>(
    `${API_ENDPOINTS.MEMBERS}/${memberId}`
  );
  return response;
};
