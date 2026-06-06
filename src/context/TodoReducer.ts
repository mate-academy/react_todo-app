import { Todo } from '../types/Todo';

export type Action =
  | { type: 'addTodo'; payload: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'clearCompleted' }
  | { type: 'toggleTodo'; payload: { id: number; checked: boolean } }
  | { type: 'allCompleted' }
  | { type: 'toggleAll' }
  | { type: 'editTodo'; payload: { id: number; title: string } };

export const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'addTodo':
      return [
        ...state,
        { title: action.payload, completed: false, id: Date.now() },
      ];

    case 'deleteTodo':
      return state.filter(todo => todo.id !== action.payload);

    case 'clearCompleted':
      return state.filter(todo => !todo.completed);

    case 'toggleTodo':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.checked }
          : todo,
      );

    case 'allCompleted':
      return state.map(todo => ({ ...todo, completed: true }));

    case 'toggleAll':
      return state.map(todo => ({ ...todo, completed: !todo.completed }));

    case 'editTodo':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

    default:
      return state;
  }
};
