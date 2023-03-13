import { Todo } from '../../types/Todo';

export type Props = {
  onClear: () => void;
  todos: Todo[];
};
