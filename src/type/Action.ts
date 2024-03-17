import { Todo } from './Todo';

export type Action =
  | { type: 'create' | 'update'; playload: Todo }
  | { type: 'delete'; playload: { id: number } }
  | { type: 'updateAll'; playload: { completed: boolean } }
  | { type: 'deleteCompleted' };
