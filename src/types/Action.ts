import { TodoAction } from './TodoActionEnum';

export type Action = { type: 'addTodo', payload: string }
| { type: TodoAction.delete, payload: number }
| { type: TodoAction.toggle, payload: number }
| { type: TodoAction.toggleAll }
| { type: TodoAction.deleteCompleted }
| { type: TodoAction.updateTodo, payloadTitle: string, payloadId: number };
