import { useContext } from 'react';
import { StateContext } from './TodoContext';
import { TodoFilter } from './TodoFilter';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(StateContext);
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);
  const handleRemoveCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      {activeTodos === 1 ? (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} item left`}
        </span>
      ) : (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} items left`}
        </span>
      )}

      <TodoFilter />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleRemoveCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
