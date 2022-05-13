import React, { useEffect, useState } from 'react';
import { TodoApp } from './components/TodoApp';
import { Info } from './components/Info';
import { createUser } from './api/api';

export const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    createUser(
      'Ivan Shulhan',
      'IvanShulhan',
      'vanyashulia.89@gmail.com',
      '+380639037909',
    )
      .then(setUser);
  }, []);

  return (
    <div className="App">
      <section className="todoapp">
        <TodoApp id={user.id} />
      </section>
      <Info name={user.name} />
    </div>
  );
};
