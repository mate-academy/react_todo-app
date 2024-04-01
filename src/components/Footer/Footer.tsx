import React from 'react';
import { useTodos } from '../../store/Store';
import TodoFilter from '../TodoFilter/TodoFilter';

const Footer: React.FC = () => {
  const { filteredTodos, clearCompleted } = useTodos();

  const itemsLeft = filteredTodos.filter(todo => !todo.completed);
  const completedLeft = filteredTodos.filter(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft.length} items left`}
      </span>

      <TodoFilter />

      {completedLeft.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
