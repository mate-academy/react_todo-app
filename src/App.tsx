import React, { useState } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Modal } from './components/Modal';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);

  return user ? (
    <div className="todoapp">
      <Header userId={user.id} todos={todos} setTodos={setTodos} />

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
                userId={user.id}
                todos={todos}
                setTodos={setTodos}
              />
            )}
          />
          <Route
            path=":condition"
            element={(
              <Main
                userId={user.id}
                todos={todos}
                setTodos={setTodos}
              />
            )}
          />
        </Route>
      </Routes>

      <Footer todos={todos} setTodos={setTodos} user={user} setUser={setUser} />
    </div>
  ) : (
    <Modal setUser={setUser} />
  );
};
