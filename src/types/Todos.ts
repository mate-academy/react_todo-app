import { NewTodo } from './NewTodo';

export interface Todos {
  todos: NewTodo[],
  setTodos: (todos: NewTodo[]) => void,
  id: number,
  setId: (id: number) => void,
  title: string,
  setTitle: (title: string) => void,
  isCompleted: boolean,
  setIsCompleted: (isCompleted: boolean) => void,
}
