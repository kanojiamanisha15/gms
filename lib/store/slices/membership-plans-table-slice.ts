import { createSlice } from "@reduxjs/toolkit";

export interface MembershipPlansTableState {
  searchInput: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const initialState: MembershipPlansTableState = {
  searchInput: "",
  page: 1,
  limit: 10,
  sortBy: "created_at",
  sortOrder: "desc",
};

export const membershipPlansTableSlice = createSlice({
  name: "membershipPlansTable",
  initialState,
  reducers: {
    setSearchInput(state, action: { payload: string }) {
      state.searchInput = action.payload;
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

export const { setSearchInput, setPage, setLimit, setSort } = membershipPlansTableSlice.actions;
export default membershipPlansTableSlice.reducer;
