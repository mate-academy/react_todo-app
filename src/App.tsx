import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { fetchUser, fetchTodos } from './api/fetchGet';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null >(null);
  const [listOfTodos, setListOfTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    fetchUser()
      .then(res => {
        if (res?.name !== undefined) {
          setUser(res);
        }

        // eslint-disable-next-line no-console
        console.log(res);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(`${err.message}`);
      });
  }, []);

  useEffect(() => {
    fetchTodos()
      .then(todos => {
        if (todos !== null) {
          setListOfTodos(todos);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(error.message);
      });
  }, []);

  // eslint-disable-next-line no-console
  console.log(listOfTodos);

  return (
    <div className="todoapp">

      <Header user={user} />

      <Main listOfTodos={listOfTodos} />

      <Footer />
    </div>
  );
};
