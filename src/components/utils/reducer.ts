import { Actions } from '../../types/Actions';
import { Todo } from '../../types/Todo';

type State = Todo[];

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: +new Date(),
          title: action.payload.title,
          completed: false,
        },
      ];

    case 'remove':
      return state.filter(todo => todo.id !== action.payload.id);

    case 'toggle':
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: action.payload.completed,
          };
        }

        return todo;
      });

    case 'update':
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.newName,
          };
        }

        return todo;
      });

    default:
      return state;
  }
};
