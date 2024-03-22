import { useTodos } from '../../utils/TodoContext';
import { Filter } from '../Filter';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const isClearButtonActive = todos.some(todo => todo.completed);
  const countActiveTodos = todos.filter(todo => !todo.completed).length;

  const clearAllCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {countActiveTodos} items left
      </span>

      <Filter />

      {isClearButtonActive && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearAllCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
