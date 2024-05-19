import { Todo } from '../../../types/Todo';

export interface Props {
  todo: Todo;
  active: React.RefObject<HTMLInputElement>;
}
