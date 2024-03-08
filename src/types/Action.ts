import { Status } from './Status';
import { Todo } from './Todo';

export type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'delete'; payload: Todo }
  | { type: 'edit'; payload: { todoToChange: Todo; newTitle: string } }
  | { type: 'complete'; payload: { todoComplete: Todo; newCompleted: boolean } }
  | { type: 'toggleAll'; payload: boolean }
  | { type: 'clearCompleted' }
  | { type: 'filter'; payload: Status };
