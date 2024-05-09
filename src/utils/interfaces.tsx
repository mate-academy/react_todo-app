export interface TodoInterface {
  id: number;
  title: string;
  completed: boolean;
}

export enum ACTIONSINFILTERCONTEXT {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
}

export enum TypeForActionInTodoContextReducer {
  UPDATESTATUS = 'UPDATESTATUS',
  DELETE = 'DELETE',
  SAVE = 'SAVE',
  UPDATETITLE = 'UPDATETITLE',
  CLEARCOMPLETEDTODOS = 'CLEARCOMPLETEDTODOS',
  COMPLETETODOS = 'COMPLETETODOS',
  DEFAULT = 'DEFAULT',
}

export type ActionInTodoContextReducer = {
  type: keyof typeof TypeForActionInTodoContextReducer;
  payload?: { idx: number; content?: string };
};
