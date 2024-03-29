import { Action } from "@ngrx/store";

export enum StudentActions {
  ADD_STUDENT = "[Student] Add Stuent",
  DELETE_STUDENT = "[Student] Delete Stuent",
  FETCH_STUDENT = "[Student] Fetch Student",
  FETCHED_STUDENT = "[Student] Fetched Student",
}

export class AddStudent implements Action {
  readonly type = StudentActions.ADD_STUDENT;
  constructor(public payload: any) {}
}

export class DeleteStudent implements Action {
  readonly type = StudentActions.DELETE_STUDENT;
  constructor(public payload: any) {}
}

export class FetchStudent implements Action {
  readonly type = StudentActions.FETCH_STUDENT;
}

export class FetchedStudent implements Action {
  readonly type = StudentActions.FETCHED_STUDENT;
  constructor(public payload: any) {}
}

export type StudentActionsUnion =
  | AddStudent
  | DeleteStudent
  | FetchStudent
  | FetchedStudent;
