import React, { useContext } from 'react';

import { TodosContext, TodosProvider } from '../TodosContext/TodosContext';

import { AddTodos } from './AddTodos';
import { TodosList } from './TodosList';
import { TodosFooter } from './TodosFooter';

export const TodosApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const toggleTodos = () => {
    let newTodos;

    if (todos.some((item) => !item.completed)) {
      newTodos = todos.map((item) => {
        if (!item.completed) {
          return {
            ...item,
            completed: true,
          };
        }

        return item;
      });
    } else {
      newTodos = todos.map((item) => {
        return {
          ...item,
          completed: false,
        };
      });
    }

    setTodos(newTodos);
  };

  return (
    <TodosProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddTodos />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all active"
            data-cy="toggleAll"
            onClick={() => toggleTodos()}
            defaultChecked={todos.every((item) => item.completed)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodosList />

        </section>

        <TodosFooter />
      </div>
    </TodosProvider>
  );
};
