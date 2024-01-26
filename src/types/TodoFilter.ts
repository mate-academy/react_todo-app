import { Status } from './Status';

export interface TodoFilterContextType {
  status: Status;
  changeStatus: (status: Status) => void;
}
