import { Todo } from './Todo';

export type Action = { type: 'create', payload: string }
| { type: 'toggle completed status', payload: Todo }
| { type: 'toggle all completed status' }
| { type: 'remove', payload: Todo }
| { type: 'remove all completed' }
| { type: 'edit title', payload: Todo };
