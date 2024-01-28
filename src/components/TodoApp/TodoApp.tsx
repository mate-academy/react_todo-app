import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { TodoList } from '../TodoList';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Status } from '../../types/Status';

export const TodoApp = () => {
  const { todos, setTodos, filterStatus } = useContext(TodosContext);
  const [toggleAll, setToggleAll] = useState(false);

  const preparedTodos = todos.filter(todo => {
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

  useEffect(() => {
    const allCompleted = todos.every((todo) => todo.completed);

    setToggleAll(allCompleted);
  }, [todos]);

  const handleToggleAll = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo, completed: !toggleAll,
    }));

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <Header />

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={toggleAll}
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={preparedTodos} />
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};
