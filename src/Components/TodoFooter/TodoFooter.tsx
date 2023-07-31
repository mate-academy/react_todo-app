import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const isTodos = todos.length > 0;

  if (!isTodos) {
    return null;
  }

  const completed = todos.filter(currentTodo => (
    currentTodo.completed === true
  ));

  const clearCompleted = () => {
    const newTodos = todos.filter(item => item.completed !== true);

    setTodos(newTodos);
  };

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
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
