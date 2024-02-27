import React, { useContext } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer/Footer';
import { TodoList } from '../TodoList/TodoList';
import { TodoContext } from '../TodoContext';
import { Status } from '../../types';

export const TodoApp = React.memo(() => {
  const { todos, setTodos, filterStatus } = useContext(TodoContext);

  const prepearedTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.Active:
        return !todo.completed;
      case Status.All:
        return true;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(todos.map(todo => ({ ...todo, completed: e.target.checked })));
  };

  return (
    <div className="todoapp">
      <Header />
      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={todos.every(el => el.completed)}
              onChange={handleOnChange}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={prepearedTodos} />
          </section>
          <Footer />
        </>
      )}
    </div>
  );
});
