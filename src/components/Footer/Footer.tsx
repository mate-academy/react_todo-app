import React, { useContext, FC } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { TodosFilter } from '../TodosFilter/TodoFilter';

export const Footer: FC = () => {
  const { todos, updateTodos } = useContext(TodosContext);

  const handleClearCompleted = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    updateTodos(todos.filter(todo => !todo.completed));
  };

  const uncompletedTodoCount = todos.filter(
    todo => !todo.completed,
  ).length;

  const completedTodoCount = todos.length - uncompletedTodoCount;

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodoCount} ${uncompletedTodoCount === 1 ? 'item' : 'items'} left`}
      </span>

      <TodosFilter />

      {completedTodoCount > 0 && (
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
