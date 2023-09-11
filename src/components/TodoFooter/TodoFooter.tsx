import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';

export const TodoFooter = () => {
  const { todos } = useContext(TodosContext);

  const countUncompletedTodos = () => (
    todos.filter(({ completed }) => !completed).length);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countUncompletedTodos()} items left`}
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
  );
};
