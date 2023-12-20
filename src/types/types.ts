export interface ITodo {
  id: number;
  completed: boolean;
  title: string;
}

export type InitialStateType = {
  todos: ITodo[];
  filter: string;
};
