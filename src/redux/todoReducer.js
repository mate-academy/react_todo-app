import {
  COMPLETE_TODO,
  CREATE_TODO,
  DELETE_TODO,
  CLEAR_COMPLETED,
  TOGGLE_ALL,
  CHANGE_TITLE,
} from './types';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(
          todo => todo.id !== action.payload,
        ),
      };

    case COMPLETE_TODO:
      return { ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              completed: action.payload.value,
            };
          }

          return todo;
        }) };

    case CLEAR_COMPLETED:
      return { ...state, todos: state.todos.filter(todo => !todo.completed) };

    case TOGGLE_ALL:
      return {
        ...state,
        todos: state.todos.map(
          todo => ({ ...todo, completed: action.payload }),
        ),
      };

    case CHANGE_TITLE:
      return { ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            };
          }

          return todo;
        }) };

    default:
      return state;
  }
};
