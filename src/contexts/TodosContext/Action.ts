import { Todo } from '../../types';

export type Action =
  | { type: 'create'; payload: Pick<Todo, 'title'> }
  | { type: 'toggleCompleted'; payload: Pick<Todo, 'id'> }
  | { type: 'toggleAllCompleted' }
  | { type: 'removeAllCompleted' }
  | { type: 'remove'; payload: Pick<Todo, 'id'> }
  | { type: 'edit'; payload: Partial<Todo> & Pick<Todo, 'id'> };
