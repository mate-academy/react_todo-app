export interface NewTodo {
  id: number,
  setId: (id: number) => {},
  title: string,
  setTitle: (title: string) => {},
  isCompleted: boolean,
  setIsCompleted: (isCompleted: boolean) => {},
}
