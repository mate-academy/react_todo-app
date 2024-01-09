import { Todo } from './Todo';

export type Action =
| { type: 'addTodo'; payload: string }
| { type: 'setCompleted'; payload: number }
| { type: 'setCompletedAll' }
| { type: 'deleteTodo'; payload: number }
| { type: 'deleteAllCompleted' }
| { type: 'editTitle'; payload: Todo }
| { type: 'setToggleAll' };
