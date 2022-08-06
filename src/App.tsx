import React, { useState } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Modal } from './components/Modal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const setUser = (id: number) => {
    setUserId(id);
  };

  return userId > 0 ? (
    <div className="todoapp">
      <Header userId={userId} todos={todos} setTodos={setTodos} />

      <Routes>
        <Route
          path="/"
          element={(
            <Outlet />
          )}
        >
          <Route
            index
            element={(
              <Main
                userId={userId}
                todos={todos}
                setTodos={setTodos}
              />
            )}
          />
          <Route
            path=":condition"
            element={(
              <Main
                userId={userId}
                todos={todos}
                setTodos={setTodos}
              />
            )}
          />
        </Route>
      </Routes>

      <Footer todos={todos} setTodos={setTodos} />
    </div>
  ) : (
    <Modal setUser={setUser} />
  );
};
