import { FilterForTodos } from './enum';
import { Todo } from './interface';

export type Action = { type: 'add', payload: Todo }
| { type: 'onEdit', payload: number }
| { type: 'delete', payload: number }
| { type: 'edit', payload: { todo: Todo, title: string } }
| { type: 'complited', payload: Todo }
| { type: 'clearComplited' }
| { type: 'toggleAll' }
| { type: 'cancelEdit' }
| { type: 'filterBy', payload: FilterForTodos };

export type GlobalStateProps = {
  children: React.ReactNode
};

export type DispatchFunction = (action: Action) => void;
