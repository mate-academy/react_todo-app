import { Sort } from './Sort';
import { Todo } from './Todo';

export type TodosContextType = {
  isLoading: boolean,
  todos: Todo[],
  loadingTodo: number[]
  deleteTodo: (value: number) => void,
  editTodo: (value1: number,
    data: { completed?: boolean, title?: string }) => void,
  addTodo: (value: string) => void,
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
