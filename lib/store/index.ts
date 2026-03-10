import { useCallback } from "react";
import { configureStore } from "@reduxjs/toolkit";
import membersTableReducer from "./slices/members-table-slice";
import trainersTableReducer from "./slices/trainers-table-slice";
import membershipPlansTableReducer from "./slices/membership-plans-table-slice";
import expensesTableReducer from "./slices/expenses-table-slice";
import {
  setSearchInput as setMembersSearchInput,
  setStatus as setMembersStatus,
  setPaymentStatus as setMembersPaymentStatus,
  setMembershipType as setMembersMembershipType,
  setPage as setMembersPage,
  setLimit as setMembersLimit,
  setSort as setMembersSort,
} from "./slices/members-table-slice";
import {
  setSearchInput as setTrainersSearchInput,
  setStatus as setTrainersStatus,
  setRole as setTrainersRole,
  setPage as setTrainersPage,
  setLimit as setTrainersLimit,
  setSort as setTrainersSort,
} from "./slices/trainers-table-slice";
import {
  setSearchInput as setMembershipPlansSearchInput,
  setPage as setMembershipPlansPage,
  setLimit as setMembershipPlansLimit,
  setSort as setMembershipPlansSort,
} from "./slices/membership-plans-table-slice";
import {
  setSearchInput as setExpensesSearchInput,
  setStatus as setExpensesStatus,
  setPage as setExpensesPage,
  setLimit as setExpensesLimit,
  setStartDate as setExpensesStartDate,
  setEndDate as setExpensesEndDate,
  clearDateRange as clearExpensesDateRange,
  setSort as setExpensesSort,
} from "./slices/expenses-table-slice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    membersTable: membersTableReducer,
    trainersTable: trainersTableReducer,
    membershipPlansTable: membershipPlansTableReducer,
    expensesTable: expensesTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/** Bound members table actions so you can pass setPage / setLimit directly to DataTable. */
export function useMembersTableActions() {
  const dispatch = useAppDispatch();
  return {
    setSearchInput: useCallback((value: string) => dispatch(setMembersSearchInput(value)), [dispatch]),
    setStatus: useCallback((value: string) => dispatch(setMembersStatus(value)), [dispatch]),
    setPaymentStatus: useCallback((value: string) => dispatch(setMembersPaymentStatus(value)), [dispatch]),
    setMembershipType: useCallback((value: string) => dispatch(setMembersMembershipType(value)), [dispatch]),
    setPage: useCallback((page: number) => dispatch(setMembersPage(page)), [dispatch]),
    setLimit: useCallback((limit: number) => dispatch(setMembersLimit(limit)), [dispatch]),
    setSort: useCallback((sortBy: string, sortOrder: "asc" | "desc") => dispatch(setMembersSort({ sortBy, sortOrder })), [dispatch]),
  };
}

/** Bound trainers table actions so you can pass setPage / setLimit directly to DataTable. */
export function useTrainersTableActions() {
  const dispatch = useAppDispatch();
  return {
    setSearchInput: useCallback((value: string) => dispatch(setTrainersSearchInput(value)), [dispatch]),
    setStatus: useCallback((value: string) => dispatch(setTrainersStatus(value)), [dispatch]),
    setRole: useCallback((value: string) => dispatch(setTrainersRole(value)), [dispatch]),
    setPage: useCallback((page: number) => dispatch(setTrainersPage(page)), [dispatch]),
    setLimit: useCallback((limit: number) => dispatch(setTrainersLimit(limit)), [dispatch]),
    setSort: useCallback((sortBy: string, sortOrder: "asc" | "desc") => dispatch(setTrainersSort({ sortBy, sortOrder })), [dispatch]),
  };
}

/** Bound membership plans table actions. */
export function useMembershipPlansTableActions() {
  const dispatch = useAppDispatch();
  return {
    setSearchInput: useCallback((value: string) => dispatch(setMembershipPlansSearchInput(value)), [dispatch]),
    setPage: useCallback((page: number) => dispatch(setMembershipPlansPage(page)), [dispatch]),
    setLimit: useCallback((limit: number) => dispatch(setMembershipPlansLimit(limit)), [dispatch]),
    setSort: useCallback((sortBy: string, sortOrder: "asc" | "desc") => dispatch(setMembershipPlansSort({ sortBy, sortOrder })), [dispatch]),
  };
}

/** Bound expenses table actions. */
export function useExpensesTableActions() {
  const dispatch = useAppDispatch();
  return {
    setSearchInput: useCallback((value: string) => dispatch(setExpensesSearchInput(value)), [dispatch]),
    setStatus: useCallback((value: string) => dispatch(setExpensesStatus(value)), [dispatch]),
    setPage: useCallback((page: number) => dispatch(setExpensesPage(page)), [dispatch]),
    setLimit: useCallback((limit: number) => dispatch(setExpensesLimit(limit)), [dispatch]),
    setStartDate: useCallback((value: string) => dispatch(setExpensesStartDate(value)), [dispatch]),
    setEndDate: useCallback((value: string) => dispatch(setExpensesEndDate(value)), [dispatch]),
    clearDateRange: useCallback(() => dispatch(clearExpensesDateRange()), [dispatch]),
    setSort: useCallback((sortBy: string, sortOrder: "asc" | "desc") => dispatch(setExpensesSort({ sortBy, sortOrder })), [dispatch]),
  };
}
