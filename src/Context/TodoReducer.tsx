import { Todo } from '../types/types';
import { Action } from './TodoContext';

export const TodoReducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'CHECK_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'EDIT_CONFIG_TODO':
      return {
        ...state,
        textToEdit: action.payload.title,
        editID: action.payload.id,
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === state.editID) {
            return { ...todo, title: action.payload };
          }

          return todo;
        }),
      };
    case 'CANCEL_TODO':
      return {
        ...state,
        textToEdit: '',
        editID: '',
      };
    case 'DELETE_COMPLETED_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'CHECK_ALL_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => {
          return { ...todo, completed: !todo.completed };
        }),
      };
    default:
      return state;
  }
};
