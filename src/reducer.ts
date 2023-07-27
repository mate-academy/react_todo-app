/* eslint-disable max-len */
import { TodoType } from './types/TodoType';

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key;
    }
    : {
      type: Key;
      payload: M[Key];
    }
};

export enum Types {
  Create = 'CREATE_TODO',
  Delete = 'DELETE_TODO',
  ToggleCompleted = 'TOGGLE_COMPLETED',
  ClearCompleted = 'CLEAR_COMPLETED',
  FilterCompleted = 'FILTER_COMPLETED',
  FilterActive = 'FILTER_ACTIVE',
  FilterAll = 'FILTER_ALL',
  ToggleSelectAll = 'TOGGLE_SELECT_ALL',
  Edit = 'EDIT_TODO',
}

type TodoPayload = {
  [Types.Create] : {
    id: number;
    title: string;
    completed: boolean;
  };
  [Types.Delete]: {
    id: number;
  };
  [Types.ToggleCompleted]: {
    id: number;
  };
  [Types.ClearCompleted]: {};
  [Types.ToggleSelectAll]: {
    isSelectedAll: boolean;
  };
  [Types.Edit]: {
    todoToEdit: TodoType;
  };
};

export type TodoActions = ActionMap<TodoPayload>[keyof ActionMap<TodoPayload>];

export const todoReducer = (todos: TodoType[], action: TodoActions | FiltertActions) => {
  switch (action.type) {
    case Types.Create:
      return [
        {
          id: action.payload.id,
          title: action.payload.title,
          completed: action.payload.completed,
        },
        ...todos,
      ];
    case Types.Delete:
      return [
        ...todos.filter(todo => todo.id !== action.payload.id),
      ];
    case Types.Edit: {
      const index = todos.findIndex(todo => (
        action.payload.todoToEdit.id === todo.id
      ));
      const result = [...todos];

      // eslint-disable-next-line no-console
      console.log(index, action.payload.todoToEdit);
      result.splice(index, 1, action.payload.todoToEdit);

      return result;
    }

    case Types.ToggleCompleted:
      return [
        ...todos.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      ];
    case Types.ClearCompleted:
      return [
        ...todos.filter(todo => todo.completed === false),
      ];
    case Types.ToggleSelectAll:
      if (action.payload.isSelectedAll) {
        return [
          ...todos.map(todo => {
            return { ...todo, completed: false };
          }),
        ];
      }

      return [
        ...todos.map(todo => {
          return { ...todo, completed: true };
        }),
      ];
    default:
      return todos;
  }
};

type FilterPayload = {
  [Types.FilterCompleted]: undefined;
  [Types.FilterActive]: undefined;
  [Types.FilterAll]: undefined;
};

// eslint-disable-next-line max-len
export type FiltertActions = ActionMap<FilterPayload>[keyof ActionMap<FilterPayload>];

export const filterReducer = (filter: string, action: TodoActions | FiltertActions) => {
  switch (action.type) {
    case Types.FilterCompleted:
      return 'completed';
    case Types.FilterActive:
      return 'active';
    case Types.FilterAll:
      return 'all';
    default:
      return filter;
  }
};
