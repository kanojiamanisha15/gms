import { createSlice } from "@reduxjs/toolkit";

export interface TrainersTableState {
  searchInput: string;
  status: string;
  role: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const initialState: TrainersTableState = {
  searchInput: "",
  status: "",
  role: "",
  page: 1,
  limit: 10,
  sortBy: "created_at",
  sortOrder: "desc",
};

export const trainersTableSlice = createSlice({
  name: "trainersTable",
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
    setRole(state, action: { payload: string }) {
      state.role = action.payload;
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

export const { setSearchInput, setStatus, setRole, setPage, setLimit, setSort } = trainersTableSlice.actions;
export default trainersTableSlice.reducer;
