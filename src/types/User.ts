export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserData = Pick<User, 'name' | 'email'>;
