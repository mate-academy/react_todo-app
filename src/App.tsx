import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { fetchUser, fetchTodos } from './api/fetchGet';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null >(null);
  const [listOfTodos, setListOfTodos] = useState<Todo[]>([]);
  const { filterCriteria } = useParams();

  useEffect(() => {
    fetchUser()
      .then(res => {
        if (res?.name !== undefined) {
          setUser(res);
        }
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

  return (
    <div className="todoapp">

      <Header
        user={user}
        setListOfTodos={setListOfTodos}
      />

      <Main
        filterCriteria={filterCriteria}
        listOfTodos={listOfTodos}
        setListOfTodos={setListOfTodos}
      />

      <Footer
        filterCriteria={filterCriteria}
        setListOfTodos={setListOfTodos}
        listOfTodos={listOfTodos}
      />
    </div>
  );
};
