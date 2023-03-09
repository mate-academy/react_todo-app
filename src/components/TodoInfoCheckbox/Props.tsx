import { Todo } from '../../types/Todo';

export type Props = {
  todo: Todo;
  onUpdate: (id: number, data: Partial<Todo>) => void;
};
