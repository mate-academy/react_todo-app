import { Todo } from './Todo';
import { User } from './User';

export interface Data {
  data?: Todo | User,
  title?: string,
  completed?: boolean,
  name?: string,
  userName?: string,
  email?: string,
  phone?: number,
}
