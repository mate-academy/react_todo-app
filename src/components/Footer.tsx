import { useContext, useMemo } from 'react';
import { TodosContext } from '../store/TodosContext';
import { TodoFilter } from './TodoFilter';

export const Footer = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const leftTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {leftTodos} {leftTodos === 1 ? 'item' : 'items'} left
      </span>

      <TodoFilter />

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedTodos}
          aria-label="Clear completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
