/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useRef, useState } from 'react';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { Filter } from './Types/Filter';
import { TodosContext } from './Components/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header input={input} />

        <TodoList input={input} filter={filter} />

        {!!todos.length && <Footer filter={filter} setFilter={setFilter} />}
      </div>
    </div>
  );
};
