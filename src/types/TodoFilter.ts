import { Status } from './Status';

export type TodoFilterContextType = {
  status: Status;
  changeStatus: (status: Status) => void;
};
