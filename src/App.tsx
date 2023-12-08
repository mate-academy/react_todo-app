/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { TodosContext } from './components/TodosContext/TodosContext';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleMarkAll = () => {
    if (todos.some(todo => !todo.completed)) {
      const newTodos = todos.map(todo => ({
        ...todo,
        completed: true,
      }));

      setTodos(newTodos);
    } else {
      const newTodos = todos.map(todo => ({
        ...todo,
        completed: false,
      }));

      setTodos(newTodos);
    }
  };

  const isChecked = () => {
    return todos.every(todo => todo.completed);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <Form />
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleMarkAll}
              checked={isChecked()}
            />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>

            <TodoList />
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};
