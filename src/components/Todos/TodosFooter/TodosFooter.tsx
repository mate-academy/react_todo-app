import { useMemo } from 'react';
import { useDispatch, useSelector } from '../../../contexts/TodosContext';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodosFooter = () => {
  const { todos } = useSelector();
  const dispatch = useDispatch();

  const activeTodosCount = useMemo(
    () => todos.filter(({ completed }) => !completed).length, [todos],
  );

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosCount} items left`}
      </span>
      <TodosFilter />
      {activeTodosCount !== todos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: 'deleteCompleted' })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
