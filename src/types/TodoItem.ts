import { Todo } from './Todo';

export type TodoItemProps = {
  item: Todo;
  currentTodoId: number | null;
  handlerCurrentTodoId: (id: number | null) => void;
};
