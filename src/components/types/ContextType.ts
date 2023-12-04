import { Todo } from './Todo';

export type ContextType = {
  todos: [] | Todo[],
  title: string,
  filteredTodos: [] | Todo[],
  filt: any,
  Position: any,
  setTodos: (todo:[] | Todo[]) => void,
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => any,
  handleAddTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  handleDelete: (id: number) => void
  handleInputChange: (updatedTodo: Todo) => void,
  handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  setFilt: (event: any) => void,
  toggled: (id: number) => void,
};
