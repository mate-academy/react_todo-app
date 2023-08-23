import { Action } from './Action';
import { Status } from './Filter';
import { Todo } from './Todo';

export type State = {
  value: Todo[];
  filterBy: Status;
  setFilterBy: React.Dispatch<React.SetStateAction<Status>>;
  dispatch: React.Dispatch<Action>
};
