import { Filter } from '../enums';
import { Todo } from './Todo';

export interface ContextProps {
  todos: Todo[],
  visibleTodos: Todo[],
  handleOnAdd: (newQuery: string) => void,
  handleAllCompletedToggle: (event: React.FormEvent<HTMLInputElement>) => void,
  handleClearAllCompleted: () => void,
  handleTodoChange: (newTodo: Todo) => void,
  handleOnDelete: (todoId: number) => void,
  handleToggleTodo: (todoId: number) => void,
  isTodosHasCompleted: boolean,
  isEveryTodoCompleted: boolean,
  filterBy: Filter,
  setFilterBy: (newFilter: Filter) => void,
  activeTodos: Todo[],
}

export interface FilterParams {
  filterBy?: Filter,
}
