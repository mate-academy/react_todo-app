/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext } from 'react';

import { Header } from './Components/Header';
import { Main } from './Components/Main/Main';
import { Footer } from './Components/Footer';
import { Todo } from './Types/todo';
import { Filter } from './Types/filter';
import { TodoContext } from './Components/Context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  const [filter, setFilter] = useState<Filter>(Filter.All);

  const completed = todos.filter(todo => todo.completed);
  const active = todos.filter(todo => !todo.completed);

  function getVisibleTodos(): Todo[] {
    switch (filter) {
      case Filter.Active:
        return active;

      case Filter.Completed:
        return completed;

      case Filter.All:
      default:
        return todos;
    }
  }

  return (
    <div className="todoapp">
      <Header />

      <Main visibleTodos={getVisibleTodos()} />

      <Footer
        filter={filter}
        setFilter={setFilter}
        active={active}
        completed={completed}
      />
    </div>
  );
};
