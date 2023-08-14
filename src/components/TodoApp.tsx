import { useTodos } from '../utils/TodoContext';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';

export const TodoApp = () => {
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm />
      </header>

      <section className="main">
        {!!todos.length && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>

        )}
        {/* <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label> */}

        <TodoList items={todos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          3 items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
