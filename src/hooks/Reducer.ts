import { Todo } from '../types/Todo';

export enum Filter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

type State = {
  todos: Todo[];
  filter: Filter;
};

type ChangePayload = {
  id: number;
  data: { param: string; value: string | boolean };
};

const initialState: State = {
  todos: [],
  filter: Filter.ALL,
};

type Action =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'CHANGE_TODO'; payload: ChangePayload }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'CHANGE_TODO':
      const { id, data } = action.payload;

      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, [data.param]: data.value } : todo,
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'CLEAR':
      const remainTodos = state.todos.filter(todo => !todo.completed);

      return {
        ...state,
        todos: remainTodos,
      };
    case 'TOGGLE':
      const updatedTodos = state.todos.map(todo =>
        todo.completed ? { ...todo, completed: !todo.completed } : todo,
      );

      return {
        ...state,
        todos: updatedTodos,
      };
    default:
      return state;
  }
}

export { reducer, initialState, type State, type Action };
