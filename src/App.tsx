/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { ReactContext } from './ReactContext';
import todos from './todos.json';

export const App: React.FC = () => {
  const [firstTask, setFirstTask] = useState(false);
  const [todoses, setTodoses] = useState(todos);
  const [filter, setFilter] = useState('All');

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
          <Header />
          {firstTask && <Main />}
          {firstTask && <Footer />}
        </ReactContext.Provider>
      </div>
    </div>
  );
};
