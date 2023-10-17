import { Todo } from './Todo';

export type Action = { type: 'add', payload: Todo }
| { type: 'toggle', payload: number }
| { type: 'toggleAll', payload: boolean }
| { type: 'delete', payload: number }
| { type: 'edit', payload: { id: number, newTitle: string } }
| { type: 'clearCompleted' };
