import { Todo } from './Todo';

export type Action =
  | { type: 'create' | 'update'; payload: Todo }
  | { type: 'updateAll'; payload: { newStatus: boolean } }
  | { type: 'delete'; payload: { id: number } }
  | { type: 'deleteCompleted' };
