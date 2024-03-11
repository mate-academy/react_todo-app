import React, { useContext } from 'react';
import { TodosContext } from '../../TodosContext';

export const Footer: React.FC = () => {
  const { todos, setTodos, filterActive, filtredCompleted } =
    useContext(TodosContext);

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const findCompleted = todos.find(todo => todo.completed === true);

  const handleClear = () => {
    setTodos(uncompletedTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos.length} ${uncompletedTodos.length === 1 ? 'item' : 'items'} left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">
            All
          </a>
        </li>

        <li>
          <a href="#/active" onClick={filterActive}>
            Active
          </a>
        </li>

        <li>
          <a href="#/completed" onClick={filtredCompleted}>
            Completed
          </a>
        </li>
      </ul>
      {findCompleted && (
        <button type="button" className="clear-completed" onClick={handleClear}>
          Clear completed
        </button>
      )}
    </footer>
  );
};
