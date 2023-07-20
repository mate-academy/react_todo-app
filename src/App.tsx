/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todos } from './Todos';
import './styles/form.scss';
import { client } from './utils/fetchClient';
import { FormUser } from './FormUser';

export enum ErrorInput {
  NONE,
  EMAILERROR,
  NAMEERROR,
}

interface User {
  email: string;
  id: number;
  name: string;
}

export const App = () => {
  function useLocaleStorage<T>(
    key: string,
    initialValue: T,
  ): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(() => {
      try {
        const item = localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch {
        return initialValue;
      }
    });

    const save = (v: T): void => {
      setValue(v);
      localStorage.setItem(key, JSON.stringify(v));
    };

    return [value, save];
  }

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [errorInput, setErrorInput] = useState<ErrorInput>(ErrorInput.NONE);
  const [secVisIn, setSecVisIn] = useState(false);
  const [user, setUser] = useLocaleStorage<User[] | []>('user', []);

  const addNewUser = (name:string, email:string) => {
    return client.post('/users', { name, email });
  };

  const checkedUserEmail = () => {
    client.get<User[]>(`/users?email=${userEmail}`).then(u => setUser(u));
  };

  const formSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const p = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')
      .test(userEmail);

    if (p) {
      checkedUserEmail();
      setSecVisIn(true);
      setErrorInput(ErrorInput.NONE);
      if (userName.length >= 4) {
        addNewUser(userName, userEmail);
        setErrorInput(ErrorInput.NONE);
      } else if (userName.length !== 0) {
        setErrorInput(ErrorInput.NAMEERROR);
      }
    } else {
      setErrorInput(ErrorInput.EMAILERROR);
    }
  };

  return (
    user.length > 0 ? (
      <Todos user={user[0]} />
    ) : (
      <FormUser
        setUserEmail={setUserEmail}
        userEmail={userEmail}
        formSubmit={formSubmit}
        errorInput={errorInput}
        secVisIn={secVisIn}
        setUserName={setUserName}
        userName={userName}
      />
    )
  );
};
