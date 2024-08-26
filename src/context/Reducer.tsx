import { Action } from '../types/Action';
import { RootState } from '../types/RootState';

export const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'get':
      return { ...state, todos: action.payload };

    case 'addTodo':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'addInputRef':
      return { ...state, inputHeaderRef: action.payload };

    case 'deleteTodo':
      return {
        ...state,
        todos: [...state.todos.filter(item => item.id !== action.payload)],
      };

    case 'patchTodo':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.payload.id) {
              return { ...todo, ...action.payload.data };
            } else {
              return todo;
            }
          }),
        ],
      };

    case 'setActions':
      return {
        ...state,
        filterActions: action.payload,
      };

    default:
      return state;
  }
};
