import { Status } from './Status';
import { Todo } from './Todo';

export type State = {
  todos: Todo[],
  filterBy: Status,
  setFilterBy: React.Dispatch<React.SetStateAction<Status>>,
  visibleTodos: Todo[],
};
