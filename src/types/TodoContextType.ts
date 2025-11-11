import { FilterType } from './FilterType';
import { Todo } from './Todo';

export type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoTitle: string;
  filterBy: FilterType;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterType>>;
  filteredTodos: Todo[];
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  handleToggleAll: () => void;
  handleUpdatedTodos: (id: number, trimedTodoTitle: string) => void;
  handleTodoSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
  handleTodoToggle: (id: number) => void;
  handleClearCompletedTodos: () => void;
  handleDeleteTodo: (id: number) => void;
};
