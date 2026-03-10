import { createSlice } from "@reduxjs/toolkit";

export interface MembersTableState {
  searchInput: string;
  status: string;
  paymentStatus: string;
  membershipType: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const initialState: MembersTableState = {
  searchInput: "",
  status: "",
  paymentStatus: "",
  membershipType: "",
  page: 1,
  limit: 10,
  sortBy: "created_at",
  sortOrder: "desc",
};

export const membersTableSlice = createSlice({
  name: "membersTable",
  initialState,
  reducers: {
    setSearchInput(state, action: { payload: string }) {
      state.searchInput = action.payload;
      state.page = 1;
    },
    setStatus(state, action: { payload: string }) {
      state.status = action.payload;
      state.page = 1;
    },
    setPaymentStatus(state, action: { payload: string }) {
      state.paymentStatus = action.payload;
      state.page = 1;
    },
    setMembershipType(state, action: { payload: string }) {
      state.membershipType = action.payload;
      state.page = 1;
    },
    setPage(state, action: { payload: number }) {
      state.page = action.payload;
    },
    setLimit(state, action: { payload: number }) {
      state.limit = action.payload;
      state.page = 1;
    },
    setSort(state, action: { payload: { sortBy: string; sortOrder: "asc" | "desc" } }) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.page = 1;
    },
  },
});

export const { setSearchInput, setStatus, setPaymentStatus, setMembershipType, setPage, setLimit, setSort } = membersTableSlice.actions;
export default membersTableSlice.reducer;
