import { Todo } from './Todo';

export type TodoToPost = Omit<Todo, 'id'>;
