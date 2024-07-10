import { LOCAL_STORAGE_TODOS_KEY } from './TodosContext';
import { ITodosAction, ITodosState } from './types';

export function reducer(state: ITodosState, action: ITodosAction): ITodosState {
  let updatedTodos;

  switch (action.type) {
    case 'add':
      updatedTodos = [
        ...state.todos,
        {
          id: +Date.now(),
          completed: false,
          title: action.payload.title,
        },
      ];

      localStorage.setItem(
        LOCAL_STORAGE_TODOS_KEY,
        JSON.stringify(updatedTodos),
      );

      return {
        ...state,
        todos: updatedTodos,
      };

    case 'update':
      updatedTodos = state.todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
      );

      localStorage.setItem(
        LOCAL_STORAGE_TODOS_KEY,
        JSON.stringify(updatedTodos),
      );

      return {
        ...state,
        todos: updatedTodos,
      };

    case 'remove':
      updatedTodos = state.todos.filter(todo => todo.id !== action.payload.id);

      localStorage.setItem(
        LOCAL_STORAGE_TODOS_KEY,
        JSON.stringify(updatedTodos),
      );

      return {
        ...state,
        todos: updatedTodos,
      };

    case 'changeStatusFiltering':
      return {
        ...state,
        filterByStatus: action.payload,
      };

    default:
      return state;
  }
}
