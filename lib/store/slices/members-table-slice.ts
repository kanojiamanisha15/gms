import { createSlice } from "@reduxjs/toolkit";

export interface MembersTableState {
  searchInput: string;
  page: number;
  limit: number;
}

const initialState: MembersTableState = {
  searchInput: "",
  page: 1,
  limit: 10,
};

export const membersTableSlice = createSlice({
  name: "membersTable",
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
  },
});

export const { setSearchInput, setPage, setLimit } = membersTableSlice.actions;
export default membersTableSlice.reducer;
