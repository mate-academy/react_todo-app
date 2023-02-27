import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types/User';

export const useAuth = (): User => {
  const tempUser: User = {
    id: 0,
    name: 'Anonym',
    email: '',
  };

  return useContext(AuthContext) || tempUser;
};
