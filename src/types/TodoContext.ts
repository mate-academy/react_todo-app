import { Todo } from './Todo';

export type TodoContext = {
  todos: Todo[]
  setTodos: (todoArr: Todo[]) => void;
  newTodo: Todo,
  setNewTodo: React.Dispatch<React.SetStateAction<Todo>>,
  filterField: string;
  setFilterField: (filterField: string) => void
};
