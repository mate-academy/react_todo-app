import { useContext } from 'react';
import { DispatchContext, StateContext } from './TodosContext';
import { TodosFilter } from './TodosFilter';

export const Footer = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const numberActiveTodos = todos.filter(todo => !todo.completed).length;
  const isCompletedTodos = Boolean(todos.length - numberActiveTodos);

  const handleClearCompleted = () => {
    dispatch({
      type: 'clearCompleted',
    });
  };

  return (
    <footer className="footer">
      {numberActiveTodos === 1 ? (
        <span className="todo-count" data-cy="todosCounter">
          1 item left
        </span>
      ) : (
        <span className="todo-count" data-cy="todosCounter">
          {`${numberActiveTodos} items left`}
        </span>
      )}

      <TodosFilter />

      {isCompletedTodos && (
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
