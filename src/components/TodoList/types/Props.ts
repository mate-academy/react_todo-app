import { Todo } from '../../../types/Todo';

export interface Props {
  todos: Todo[];
  active: React.RefObject<HTMLInputElement>;
}
