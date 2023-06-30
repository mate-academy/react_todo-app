export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface INewTodo {
  userId: number;
  title: string;
  completed: boolean;
}
