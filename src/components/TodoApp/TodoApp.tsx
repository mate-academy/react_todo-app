/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { TodosContext } from '../../contextes/TodosContext';

export const TodoApp = () => {
  const { todos, setTodos, filterField } = useContext(TodosContext);

  const conuterOfCompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length === 0;
  }, [todos]);

  const toggledTodosList = useMemo(() => {
    if (conuterOfCompletedTodos) {
      return todos.map(todo => ({
        ...todo,
        completed: false,
      }));
    }

    return todos.map(todo => ({
      ...todo,
      completed: true,
    }));
  }, [todos, conuterOfCompletedTodos]);

  const preparedTodosList = todos.filter(todo => {
    switch (filterField) {
      case 'Active':
        return todo.completed === false;

      case 'Completed':
        return todo.completed === true;

      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <Header />

      <section className="main">
        {!todos.length || (
          <>
            <input
              checked={conuterOfCompletedTodos}
              onChange={() => setTodos(toggledTodosList)}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        {!!todos.length && (
          <TodoList items={preparedTodosList} />
        )}

      </section>

      {!!todos.length && (
        <Footer />
      )}
    </div>
  );
};
