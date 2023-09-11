import { TodoType } from './TodoType';

export type Action = { type: 'delete', payload: number }
| { type: 'setCompleted', payload: number }
| { type: 'add', payload: TodoType }
| { type: 'clearCompleted' }
| { type: 'setCompletedAll' }
| { type: 'setFilterActive' }
| { type: 'setFilterCompleted' }
| { type: 'setFilterAll' }
| { type: 'editTitle', payload: { id: number, title: string } };
