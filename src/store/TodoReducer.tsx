import { TodoType } from '../types/TodoType';

const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const COMPLETE_ALL = 'COMPLETE_ALL';
const DELETE_TODO = 'DELETE_TODO';
const DELETE_COMPLETED = 'DELETE_COMPLETED';
const RENAME_TODO = 'RENAME_TODO';

type State = TodoType[];

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

export const TodoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          title: action.title,
          completed: false,
        },
      ];
    case COMPLETE_TODO:
      return state.map(item =>
        item.id === action.id ? { ...item, completed: !item.completed } : item,
      );
    case COMPLETE_ALL:
      return state.map(item => ({
        ...item,
        completed: action.isDone,
      }));
    case DELETE_TODO:
      return state.filter(item => item.id !== action.id);
    case DELETE_COMPLETED:
      return state.filter(item => !item.completed);
    case RENAME_TODO:
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.title }
          : item,
      );
    default:
      return state;
  }
};

export const addTodoAction = (title: string): AddTodoAction => ({
  type: ADD_TODO,
  title,
});
export const completeTodoAction = (id: number): CompleteTodoAction => ({
  type: COMPLETE_TODO,
  id,
});
export const completeAllAction = (isDone: boolean): CompleteAllAction => ({
  type: COMPLETE_ALL,
  isDone,
});
export const deleteTodoAction = (id: number): DeleteTodoAction => ({
  type: DELETE_TODO,
  id,
});
export const deleteCompletedAction = (): DeleteCompletedAction => ({
  type: DELETE_COMPLETED,
});
export const renameTodoAction = (
  id: number,
  title: string,
): RenameTodoAction => ({ type: RENAME_TODO, payload: { id, title } });
