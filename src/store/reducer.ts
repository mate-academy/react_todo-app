import { LocalStorage } from '../services/LocalStorage';
import { Todo } from '../services/Todo';
import { TodoModel } from '../types/Todo.model';
import { Filter } from '../types/common';
import {
  CREATE_TODO,
  DELETE_TODO,
  INIT,
  UPDATE_FILTER,
  UPDATE_TODO,
} from '../utils/actionTypes';

interface CreateTodoPayload {
  title: string;
}

interface UpdateTodoPayload extends Partial<TodoModel> {
  id: number;
}

interface DeleteTodoPayload {
  id: number;
}

interface UpdateFilterPayload {
  filter: Filter;
}

export type Action =
  | { type: typeof INIT }
  | { type: typeof CREATE_TODO; payload: CreateTodoPayload }
  | { type: typeof UPDATE_TODO; payload: UpdateTodoPayload }
  | { type: typeof DELETE_TODO; payload: DeleteTodoPayload }
  | { type: typeof UPDATE_FILTER; payload: UpdateFilterPayload };

export type Dispatch = (action: Action) => void;

export interface State {
  todos: TodoModel[];
  filter: Filter;
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case INIT: {
      const todos = LocalStorage.getItem<TodoModel[]>('todos') || [];
      const filter = (window.location.hash.split('#')[1]?.replace('/', '') ||
        'all') as Filter;

      return {
        ...state,
        filter,
        todos,
      };
    }

    case CREATE_TODO: {
      const newTodo = new Todo(action.payload.title);
      const todos = [...state.todos, newTodo];

      LocalStorage.setItem('todos', todos);

      return { ...state, todos };
    }

    case UPDATE_TODO: {
      const todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            ...action.payload,
          };
        }

        return todo;
      });

      LocalStorage.setItem('todos', todos);

      return {
        ...state,
        todos,
      };
    }

    case DELETE_TODO: {
      const todos = state.todos.filter(({ id }) => id !== action.payload.id);

      LocalStorage.setItem('todos', todos);

      return { ...state, todos };
    }

    case UPDATE_FILTER: {
      return { ...state, filter: action.payload.filter };
    }

    default: {
      return state;
    }
  }
};
