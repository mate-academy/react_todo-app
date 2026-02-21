import { createContext } from 'react';
import { TodoType } from './../types/TodoType';

const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const COMPLETE_ALL = 'COMPLETE_ALL';
const DELETE_TODO = 'DELETE_TODO';
const DELETE_COMPLETED = 'DELETE_COMPLETED';
const RENAME_TODO = 'RENAME_TODO';

type AddTodoAction = {
  type: typeof ADD_TODO;
  title: string;
};

type CompleteTodoAction = {
  type: typeof COMPLETE_TODO;
  id: number;
};

type CompleteAllAction = {
  type: typeof COMPLETE_ALL;
  isDone: boolean;
};

type DeleteTodoAction = {
  type: typeof DELETE_TODO;
  id: number;
};

type DeleteCompletedAction = {
  type: typeof DELETE_COMPLETED;
};

type RenameTodoAction = {
  type: typeof RENAME_TODO;
  payload: {
    id: number;
    title: string;
  };
};

type Action =
  | AddTodoAction
  | DeleteTodoAction
  | CompleteTodoAction
  | RenameTodoAction
  | CompleteAllAction
  | DeleteCompletedAction;

export interface Props {
  todos: TodoType[];
  dispatch: React.Dispatch<Action>;
}

export const TodoContext = createContext<Props>({
  todos: [],
  dispatch: (() => { }) as React.Dispatch<Action>,
});
