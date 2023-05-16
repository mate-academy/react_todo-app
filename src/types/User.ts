export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: {
    id: number;
    userId: number;
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    createdAt: string;
    updatedAt: string;
  };
}
