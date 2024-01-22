/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { TodosContext } from '../../contextes/TodosContext';

export const TodoApp = () => {
  const { todos, setTodos, filterField } = useContext(TodosContext);

  const conuterOfCompletedTodos = (todosList: Todo[]) => {
    return todosList.filter(todo => !todo.completed).length === 0;
  };

  const toggledTodosList = (currentTodos: Todo[]) => {
    if (conuterOfCompletedTodos(todos)) {
      return currentTodos.map(todo => ({
        ...todo,
        completed: false,
      }));
    }

    return currentTodos.map(todo => ({
      ...todo,
      completed: true,
    }));
  };

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
              checked={conuterOfCompletedTodos(todos)}
              onChange={() => setTodos(toggledTodosList(todos))}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        {Boolean(todos.length) && (
          <TodoList items={preparedTodosList} />
        )}
      </section>

      {Boolean(todos.length) && (
        <Footer />
      )}
    </div>
  );
};
