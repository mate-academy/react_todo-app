import { Status } from './Status';
import { Todo } from './Todo';

export type FilterOption = {
  hash: Status,
  title: string,
  callback: (value: Todo) => boolean
};
