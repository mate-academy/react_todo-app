import { Todo } from '../../types/Todo';

export type Props = {
  todo: Todo;
  onDelete: (value: number) => void;
  onUpdate: (id: number, data: Partial<Todo>) => void;
  isProcessing: (id: number) => boolean;
};
