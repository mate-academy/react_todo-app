import { Action } from '../types/Action';
import { Todo } from '../types/Todo';
import { TodoAction } from '../types/TodoActionEnum';

export function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case TodoAction.add:
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          completed: false,
        },
      ];

    case TodoAction.delete:
      return [
        ...state.filter(todo => todo.id !== action.payload),
      ];

    case TodoAction.deleteCompleted:
      return state.filter((todo) => !todo.completed);

    case TodoAction.toggle:
      return state.map(todo => (todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo));

    case TodoAction.toggleAll:
      return state.map((todo) => ({
        ...todo, completed: !(state.every((todol) => todol.completed)),
      }));

    case TodoAction.updateTodo:
      return state.map(prevTodo => (prevTodo.id === action.payloadId
        ? { ...prevTodo, title: action.payloadTitle }
        : prevTodo));

    default:
      return state;
  }
}
