import { createSlice } from "@reduxjs/toolkit";

export interface ExpensesTableState {
  searchInput: string;
  status: string;
  page: number;
  limit: number;
  startDate: string;
  endDate: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const getCurrentMonthDates = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    startDate: `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`,
    endDate: `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`,
  };
};

const { startDate, endDate } = getCurrentMonthDates();

const initialState: ExpensesTableState = {
  searchInput: "",
  status: "",
  page: 1,
  limit: 10,
  startDate,
  endDate,
  sortBy: "date",
  sortOrder: "desc",
};

export const expensesTableSlice = createSlice({
  name: "expensesTable",
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
    setPage(state, action: { payload: number }) {
      state.page = action.payload;
    },
    setLimit(state, action: { payload: number }) {
      state.limit = action.payload;
      state.page = 1;
    },
    setStartDate(state, action: { payload: string }) {
      state.startDate = action.payload;
      state.page = 1;
    },
    setEndDate(state, action: { payload: string }) {
      state.endDate = action.payload;
      state.page = 1;
    },
    clearDateRange(state) {
      state.startDate = "";
      state.endDate = "";
      state.page = 1;
    },
    setSort(state, action: { payload: { sortBy: string; sortOrder: "asc" | "desc" } }) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.page = 1;
    },
  },
});

export const {
  setSearchInput,
  setStatus,
  setPage,
  setLimit,
  setStartDate,
  setEndDate,
  clearDateRange,
  setSort,
} = expensesTableSlice.actions;
export default expensesTableSlice.reducer;
