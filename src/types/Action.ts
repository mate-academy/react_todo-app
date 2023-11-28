import { Status } from './Status';
import { Todo } from './Todo';

export type Action =
{ type: 'createTodo', payload: Todo }
| { type: 'updateTodo', payload: Todo }
| { type: 'toggleAll', payload: boolean }
| { type: 'filter', payload: Status }
| { type: 'destroy', payload: number }
| { type: 'clear' }
| { type: 'edit', payload: Todo };
