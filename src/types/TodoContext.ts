import { Sort } from './Sort';
import { Todo } from './Todo';

export type TodosContextType = {
  isLoading: boolean,
  todos: Todo[],
  loadingTodo: number[]
  deleteTodo: (todoId: number) => void,
  editTodo: (todoId: number,
    data: { completed?: boolean, title?: string }) => void,
  addTodo: (title: string) => void,
  isInputDisabled: boolean,
  handleRemoveCompletedTodos: ()=> void,
  setSort: (arg: Sort) => void,
  sort: Sort,
  errorType: string,
  setErrorType: (arg: string) => void,
  handleToggleAll: () => void,
  tempTodo: Todo | null,
  activeTodos: Todo[],
  completedTodos: Todo[],
  isCompletedTodos: boolean,
};
