/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import { AnyAction } from 'redux';
import { State } from '../type';

export const GET_TODOS = 'get_todos';
export const ADD_TODO = 'add_todo';
export const FILTER_UNCOMPLETED = 'filter_uncompleted';
export const FILTER_COMPLETED = 'filter_uncompleted';
export const COUNT_OF_ACTIVE = 'count_of_active';
export const CHECK_TODO = 'check_todo';
export const TOGGLE_ALL = 'toggle_all';
export const DELETE_TODO = 'delete_todo';
export const DELETE_ALL = 'delete_all';
export const EDIT_TODO = 'edit_todo';

const str = localStorage.getItem('todos');

let todosFromStorage = [];

if (str !== null) {
  todosFromStorage = JSON.parse(str);
}

const defaultState = {
  todos: todosFromStorage || [],
  countOfActiveTodos: 1,
  visibleTodos: [],
};

export const todosReducer = (
  state: State = defaultState, action: AnyAction,
) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, visibleTodos: [...state.todos] };

    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

    case CHECK_TODO:
      const foundTodo = state.todos.find(
        todoEl => todoEl.id === action.payload,
      );

      if (foundTodo) {
        foundTodo.completed = !foundTodo.completed;
      }

      return {
        ...state, todos: [...state.todos],
      };

    case FILTER_COMPLETED:
      return {
        ...state,
        visibleTodos: action.payload,
      };

    case FILTER_UNCOMPLETED:
      return {
        ...state,
        visibleTodos: action.payload,
      };

    case COUNT_OF_ACTIVE:
      return {
        ...state,
        countOfActiveTodos: [...state.todos].filter(
          todo => todo.completed === false,
        ).length,
      };

    case TOGGLE_ALL:
      if (state.countOfActiveTodos === 0
        || state.countOfActiveTodos === state.todos.length) {
        return {
          ...state,
          todos: [...state.todos.map(todo => {
            todo.completed = !todo.completed;

            return todo;
          })],
        };
      }

      return {
        ...state,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(
          todo => todo.id !== action.payload,
        ),
      };

    case DELETE_ALL:
      return {
        ...state,
        todos: state.todos.filter(
          todo => todo.completed === false,
        ),
      };

    case EDIT_TODO:
      const selectedTodo = state.todos.find(
        el => el.id === action.payload.id,
      );

      if (selectedTodo) {
        selectedTodo.title = action.payload.title;
      }

      return {
        ...state,
        todos: [...state.todos],
      };

    default:
      return state;
  }
};
