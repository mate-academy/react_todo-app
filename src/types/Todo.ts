export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoPatchProps = { [key in keyof Omit<Todo, 'id'>]?: Todo[key] };
