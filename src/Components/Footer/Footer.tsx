import React, { useContext } from 'react';

import { TodosFilter } from './TodosFilter';
import { TodoContext } from '../Context/TodoContext';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const unCompleted = todos.filter(todo => !todo.completed);
  const completed = todos.filter(todo => todo.completed);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${unCompleted.length} items left`}
      </span>

      <TodosFilter />

      {completed.length !== 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
