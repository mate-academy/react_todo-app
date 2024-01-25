import { Todo } from './Todo';

export type TodoContext = {
  todos: Todo[]
  setTodos: (v: Todo[] | ((n: Todo[]) => Todo[])) => void
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  filterField: string;
  setFilterField: (filterField: string) => void
};
