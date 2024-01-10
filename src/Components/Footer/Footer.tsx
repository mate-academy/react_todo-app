import React, { useContext } from 'react';

import { TodosFilter } from './TodosFilter';
import { ToDoContext } from '../Context/ToDoContext';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(ToDoContext);

  const unCompleted = [...todos].filter(todo => todo.completed === false);
  const completed = [...todos].filter(todo => todo.completed === true);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
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
