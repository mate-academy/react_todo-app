import { useContext } from 'react';
import { TodoFilter } from './TodoFilter';
import { DispatchContext, StateContext } from '../management/TodoContext';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);

  const handleRemoveComplTodos = () => {
    dispatch({
      type: 'removeComplTodos',
    });
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
          onClick={handleRemoveComplTodos}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
