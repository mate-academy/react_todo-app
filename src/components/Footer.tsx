import React, { useContext } from 'react';
import { TodosContext } from '../providers/TodosProvider';
import { TodosFilter } from './TodosFilter';

type Props = {};

export const Footer: React.FC<Props> = React.memo(() => {
  const { todos, setTodos } = useContext(TodosContext);

  const remainingTodosCount = todos.filter(todo => !todo.completed).length;
  const canClearCompleted = todos.some(todo => todo.completed);

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${remainingTodosCount} items left`}
      </span>

      <TodosFilter />

      {canClearCompleted && (
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
});
