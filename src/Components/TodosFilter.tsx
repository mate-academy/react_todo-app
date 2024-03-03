import React, { useContext } from 'react';
import { TodosContext } from '../Context/TodosProvider';

interface Props {
  handleFiltering: (filterType: 'all' | 'active' | 'completed') => void;
}

export const TodosFilter: React.FC<Props> = ({ handleFiltering }) => {
  const { todos, dispatch } = useContext(TodosContext);
  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const numberOfTodos = notCompletedTodos.length;

  const handleClearCompleted = () => {
    dispatch({ type: 'clear-completed' });
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {numberOfTodos} items left
      </span>

      <ul className="filters">
        <li>
          <a onClick={() => handleFiltering('all')} href="#/">
            All
          </a>
        </li>

        <li>
          <a onClick={() => handleFiltering('active')} href="#/active">
            Active
          </a>
        </li>

        <li>
          <a onClick={() => handleFiltering('completed')} href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      {completedTodos.length !== 0 && (
        <button
          type="button"
          onClick={handleClearCompleted}
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
