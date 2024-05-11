import { Action, ActionTypes, FilterFields, TodoState } from './types';

export const initialState: TodoState = {
  todos: [],
  filter: FilterFields.All,
};

export const reducer = (state: TodoState, action: Action) => {
  //console.log(state);
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case ActionTypes.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    case ActionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};
