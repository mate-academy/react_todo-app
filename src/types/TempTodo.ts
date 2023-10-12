import { Todo } from './Todo';

export type TempTodo = Omit<Todo, 'id'>;
