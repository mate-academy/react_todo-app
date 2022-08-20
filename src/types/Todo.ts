interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export type TodoPatch =
  Required<Pick<Todo, 'id'>>
  & Partial<Pick<Todo, 'completed' | 'title'>>;

export default Todo;
