import { Todo } from './Todo';

export type ContextType = {
  todos: [] | Todo[],
  title: string,
  filteredTodos: [] | Todo[],
  filt: any,
  Position: any,
  setTodos: (todo:[] | Todo[]) => void,
  handleTitleChange: (event: any) => any,
  handleAddTodo: (event: any) => void,
  handleDelete: (id: number) => void
  handleInputChange: (updatedTodo: Todo) => void,
  setSelectedTodo: (todo: Todo | null) => void,
  handleEnter: (event: any) => void,
  setFilt: (event: any) => void,
};
