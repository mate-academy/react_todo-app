import { useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from '../../store/store';
import { TodoList } from '../TodoList';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

import './Main.scss';

export const Main = () => {
  const { todos, selectedTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const filteredTodos = useMemo(
    () => getFilteredTodos(selectedTodos, todos),
    [selectedTodos, todos],
  );

  const completedAll = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  const activeAll = useMemo(
    () => todos.every(todo => !todo.completed),
    [todos],
  );

  const isVisibleToggleAll = useMemo(() => {
    return (completedAll || activeAll) && todos.length > 0;
  }, [todos, completedAll, activeAll]);

  return (
    <section className="main">
      {isVisibleToggleAll
        && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={completedAll}
              onChange={() => dispatch({ type: 'toggleAllTodos' })}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

      <TodoList todos={filteredTodos} />
    </section>
  );
};
