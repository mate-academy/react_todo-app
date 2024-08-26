import { Actions } from './Actions';
import { Todo } from './Todo';

export type RootState = {
  todos: Todo[];
  inputHeaderRef: React.RefObject<HTMLInputElement> | null;
  filterActions: Actions;
};
