import { Action } from '../type/Action';
import { Todo } from '../type/Todo';

const TodoReducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'COMPLETE_TODO':
      return state.map(item => {
        if (item.id === action.item) {
          return {
            ...item,
            completed: action.payload,
          };
        }

        return item;
      });
    case 'TOGGLE_ALL':
      return state.map(item => ({
        ...item,
        completed: action.payload,
      }));
    case 'CLEAR_COMPLETED_TODOS':
      return [...state].filter(todo => !todo.completed);
    case 'CLEAR_TODO':
      return [...state].filter(todo => todo.id !== action.payload);
    case 'EDIT_TODO':
      return [...state].map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            title: action.editTitle,
          };
        } else {
          return todo;
        }
      });
    case 'EMPTY_TODO':
      return [...state].filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

export default TodoReducer;
