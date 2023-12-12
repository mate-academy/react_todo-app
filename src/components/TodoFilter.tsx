import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export const TodoFilter = () => {
  const { todos, setTodos, setFilterStatus } = useContext(TodoContext);

  const handleNewStatus = (status: string) => {
    setFilterStatus(status);
  };

  const handleDeleteCompletedTodo = () => {
    const updatedTodo = todos.filter(todo => !todo.completed);

    setTodos(updatedTodo);
  };

  const showClearButton = todos.some(todo => todo.completed);

  const completedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${completedTodos.length} items left`}
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={() => handleNewStatus('all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => handleNewStatus('active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => handleNewStatus('completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      {showClearButton && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompletedTodo}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
