import { Todo } from './Todo';

export type Action = { type: 'add_todo', payload: Todo }
| { type: 'remove_todo', payload: number }
| { type: 'change_status', payload: number }
| { type: 'toggle_all' }
| { type: 'remove_all_completed' }
| { type: 'edit_todo', payload: { id: number, newTitle: string }
};
