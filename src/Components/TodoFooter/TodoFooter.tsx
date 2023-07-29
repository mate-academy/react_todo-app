import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoFooter: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const isTodos = todos.length > 0;

  if (!isTodos) {
    return null;
  }

  const completed = todos.filter(currentTodo => (
    currentTodo.completed === true
  ));

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${completed.length} items left`}
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

      {completed.length > 0 && (
        <button type="button" className="clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
