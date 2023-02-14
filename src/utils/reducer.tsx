import { Action } from '../enums/Action';
import { ActionType } from '../types/ActionType';
import { State } from '../types/State';
import { Todo } from '../types/Todo';

export function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case Action.LOAD:
      return {
        ...state,
        todos: [...(action.payload as Todo[])],
      };

    case Action.ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          (action.payload as Todo),
        ],
      };

    case Action.DELETE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case Action.CLEAR:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case Action.TOGGLE_ALL: {
      const toggleValue = state.todos.every(todo => todo.completed);
      const toggledTodos = state.todos.map(todo => {
        return {
          ...todo,
          completed: !toggleValue,
        };
      });

      return {
        ...state,
        todos: toggledTodos,
      };
    }

    case Action.UPDATE: {
      const [id, value] = (
        action.payload as [id: number, value: Partial<Todo>]
      );
      const updatedTodos = state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            ...value,
          };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case Action.ERROR:
      return {
        ...state,
        error: (action.payload as string),
      };

    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}
