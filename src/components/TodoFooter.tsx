import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoFilter } from './TodoFilter';

export const TodoFooter: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    return null;
  }

  const { todos, setTodos } = context;

  const clearComplete = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const isCompleted = todos.some(todo => todo.completed);

  const todosLeft = todos.filter(todo => todo.completed === false).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <TodoFilter />

      {isCompleted
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearComplete}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
