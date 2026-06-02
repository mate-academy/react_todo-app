import { Todo } from '../types/Todo';
import { FilterOption } from '../types/FilterOption';

export interface State {
  todos: Todo[];
  filter: FilterOption;
}

export type Action =
  | { type: 'add'; payload: string }
  | { type: 'edit'; payload: { id: Todo['id']; title: string } }
  | { type: 'toggle'; payload: { id: Todo['id'] } }
  | { type: 'toggleAll' }
  | { type: 'remove'; payload: Todo['id'] }
  | { type: 'removeCompleted' }
  | { type: 'setFilter'; payload: FilterOption };

export const todoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add': {
      const newTodo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'remove': {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    }

    case 'removeCompleted': {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    }

    case 'edit': {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    }

    case 'toggle': {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    }

    case 'toggleAll': {
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: !allCompleted })),
      };
    }

    case 'setFilter': {
      return {
        ...state,
        filter: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
