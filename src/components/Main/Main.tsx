import React, { useCallback, useContext, useMemo } from 'react';

import { TodoList } from '../TodoList';
import { Todo } from '../../types/Todo';
import {
  DispatchContext,
  TodosContext,
} from '../../store/GlobalContextProvider';

interface Props {
  items: Todo[];
}

export const Main: React.FC<Props> = React.memo(({ items }) => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const isAllCompleted = useMemo(
    () => (todos.length === 0
      ? false
      : todos.every(({ completed }) => completed)), [todos],
  );

  const handleToggleAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'toggleAll', payload: event.target.checked });
    },
    [dispatch],
  );

  return (
    <section className="main">
      <input
        name="toggle-all"
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isAllCompleted}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={items} />
    </section>
  );
});
