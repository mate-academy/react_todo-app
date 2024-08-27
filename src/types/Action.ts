import { Status } from './Status';
import { Todo } from './Todo';

export type Action =
  | { type: 'get'; payload: Todo[] }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'addInputRef'; payload: React.RefObject<HTMLInputElement> }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'patchTodo'; payload: { id: number; data: Omit<Todo, 'id'> } }
  | { type: 'setActions'; payload: Status };
