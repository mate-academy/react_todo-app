import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodosFilter } from './TodoFilter';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    // Filter out completed todos and update the state
    const uncompletedTodos = todos.filter(todo => !todo.completed);

    setTodos(uncompletedTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} item${itemsLeft !== 1 ? 's' : ''} left`}
      </span>

      <TodosFilter />

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
