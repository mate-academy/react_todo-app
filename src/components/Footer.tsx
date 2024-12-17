import { useCallback, useContext, useMemo } from 'react';
import { Filter } from './Filter';
import { StateContext } from '../context/GlobalContextProvider';
import { DispatchContext } from '../context/GlobalContextProvider';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [todoCount, completedTodoCount, activeTodoCount] = useMemo(() => {
    const allCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = allCount - completedCount;

    return [allCount, completedCount, activeCount];
  }, [todos]);

  const handleClearCompleted = useCallback(() => {
    dispatch({
      type: 'setTodos',
      payload: todos.filter(todo => !todo.completed),
    });
  }, [dispatch, todos]);

  return (
    !!todoCount && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${activeTodoCount} items left`}
        </span>

        <Filter />

        <button
          type="button"
          className="todoapp__clear-completed"
          disabled={!completedTodoCount} //disabled if there are no completed todos
          onClick={handleClearCompleted}
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
