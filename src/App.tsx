/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { ReactContext } from './ReactContext';
import todos from './todos.json';

export const App: React.FC = () => {
  const [firstTask, setFirstTask] = useState(false);
  const [todoses, setTodoses] = useState(todos);
  const [filter, setFilter] = useState('All');
  const active = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active.current) {
      active.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <ReactContext.Provider
          value={{
            firstTask: firstTask,
            setFirstTask: setFirstTask,
            todos: todoses,
            setTodoses: setTodoses,
            filter: filter,
            setFilter: setFilter,
          }}
        >
          <Header active={active} />
          {firstTask && <Main />}
          {firstTask && <Footer />}
        </ReactContext.Provider>
      </div>
    </div>
  );
};
