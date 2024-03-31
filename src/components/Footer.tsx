import { useContext, useMemo } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { TodosFilter } from './TodosFilter';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const count = useMemo(
    () => todos.filter(todo => todo.completed === false).length,
    [todos],
  );

  const clearCompleted = () => {
    const clearedTodos = todos.filter(todo => !todo.completed);

    setTodos(clearedTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {count} items left
      </span>

      <TodosFilter />

      {todos.some(todo => todo.completed) && (
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
