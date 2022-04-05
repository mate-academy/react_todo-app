import { createStore } from 'redux';
import {
  SET_ACTIVE_FILTER,
  SET_COMPLETED_TODOS,
  SET_EDITING_ID,
  SET_INITIAL_TITLE,
  SET_NEW_TODO,
  SET_TODOS,
  SET_VISIBLE_TODOS,
} from './actions';

const initialState: State = {
  todos: [],
  visibleTodos: [],
  completedTodos: [],
  newTodo: '',
  activeFilter: 'all',
  editingId: 0,
  initialTitle: [],
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case SET_VISIBLE_TODOS:
      return {
        ...state,
        visibleTodos: [...action.payload],
      };

    case SET_COMPLETED_TODOS:
      return {
        ...state,
        completedTodos: [...action.payload],
      };

    case SET_NEW_TODO:
      return {
        ...state,
        newTodo: action.payload,
      };

    case SET_ACTIVE_FILTER:
      return {
        ...state,
        activeFilter: action.payload,
      };

    case SET_EDITING_ID:
      return {
        ...state,
        editingId: action.payload,
      };

    case SET_INITIAL_TITLE:
      return {
        ...state,
        initialTitle: [...action.payload],
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
