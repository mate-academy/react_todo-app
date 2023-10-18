import { Todo } from './Todo';

export type Action = { type: 'add', payload: Todo }
| { type: 'remove', payload: number }
| { type: 'clearAllCompleted', payload: Todo[] }
| { type: 'toggle', payload: Todo }
| { type: 'toggleAll', payload: boolean }
| { type: 'edit', payload: Todo };
