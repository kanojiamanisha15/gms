import { createSlice } from "@reduxjs/toolkit";

export interface TrainersTableState {
  searchInput: string;
  page: number;
  limit: number;
}

const initialState: TrainersTableState = {
  searchInput: "",
  page: 1,
  limit: 10,
};

export const trainersTableSlice = createSlice({
  name: "trainersTable",
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

export const { setSearchInput, setPage, setLimit } = trainersTableSlice.actions;
export default trainersTableSlice.reducer;
