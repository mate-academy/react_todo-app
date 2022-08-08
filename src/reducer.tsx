import Todo from './types/Todo';

export enum ActionType {
  Add = 'todos/ADD',
  Update = 'todos/UPDATE',
  UpdateAll = 'todos/UPDATEALL',
  Remove = 'todos/REMOVE',
  RemoveAll = 'todos/REMOVEALL',
}

export interface State {
  todos: Todo[];
}

export type Action =
  | { type: ActionType.Add, payload: Todo }
  | { type: ActionType.Update, payload: Todo }
  | { type: ActionType.UpdateAll, payload: Pick<Todo, 'completed'> }
  | { type: ActionType.Remove, payload: Pick<Todo, 'id'> }
  | { type: ActionType.RemoveAll, payload: Pick<Todo, 'completed'> };

export function TodoReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.Add: {
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload,
        ],
      };
    }

    case ActionType.Update: {
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id !== action.payload.id) {
              return todo;
            }

            return {
              ...todo,
              title: action.payload.title,
              completed: action.payload.completed,
            };
          }),
        ],
      };
    }

    case ActionType.UpdateAll: {
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => (
            {
              ...todo,
              ...action.payload,
            }
          )),
        ],
      };
    }

    case ActionType.Remove: {
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => todo.id !== action.payload.id),
        ],
      };
    }

    case ActionType.RemoveAll: {
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => todo.completed
            !== action.payload.completed),
        ],
      };
    }

    default:
      return state;
  }
}
