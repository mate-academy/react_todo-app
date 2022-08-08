import { ChangeStatusTodo, ChangeTitleTodo, CreateTodo } from './Todo';
import { User } from './User';

// eslint-disable-next-line max-len
export type Data = User | CreateTodo | ChangeStatusTodo | ChangeTitleTodo | null;
