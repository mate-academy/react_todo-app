import { State } from '../types/State';
import { Action, Actions } from '../types/Actions';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case Action.saveTodo:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case Action.updateTodo:
      if (action.payload === undefined) {
        const isCompleteAll = state.todos.every(todo => todo.completed);

        return {
          ...state,
          todos: state.todos.map(todo => ({
            ...todo,
            completed: !isCompleteAll,
          })),
        };
      } else {
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload?.id
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        };
      }

    case Action.changeTodo:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.editedTitle }
            : todo,
        ),
      };

    case Action.clearTodo:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case Action.filterTodo:
      return {
        ...state,
        filterTodo: action.payload,
      };

    default:
      return state;
  }
}
