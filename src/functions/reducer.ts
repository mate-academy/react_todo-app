import { Action } from '../types/Action';
import { Todo } from '../types/Todo';

export function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case 'addTodo':
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          completed: false,
        },
      ];

    case 'deleteTodo':
      return [
        ...state.filter(todo => todo.id !== action.payload),
      ];
    case 'toggleTodo':
      return state.map(todo => (todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo));
    case 'toggleAllTodo':
      return state.map((todo) => ({
        ...todo, completed: !(state.every((todol) => todol.completed)),
      }));
    case 'deleteCompletedTodo':
      return state.filter((todo) => !todo.completed);
    case 'updateTodoTitle':
      return state.map(prevTodo => (prevTodo.id === action.payloadId
        ? { ...prevTodo, title: action.payloadTitle }
        : prevTodo));

    default:
      return state;
  }
}
