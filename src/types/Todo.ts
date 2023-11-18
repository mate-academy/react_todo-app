export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoId = Todo['id'];
