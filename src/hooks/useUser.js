import { useState, useEffect } from 'react';
import { getUser } from '../api';
import { USER_ID } from '../constants';

export const useUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(USER_ID)
      .then(setUser)
      .catch(error => alert(`Failed to fetch user data; ${error}`));
  }, []);

  return user;
};
