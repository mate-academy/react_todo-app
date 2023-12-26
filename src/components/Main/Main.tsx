import React, { useCallback, useContext } from 'react';
import { DispatchContext, TodosContext } from '../GlobalContextProvider';
import { TodoList } from '../TodoList';
import { Todo } from '../../types/Todo';

interface Props {
  items: Todo[];
}

export const Main: React.FC<Props> = React.memo(({ items }) => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const handleToggleAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'toggleAll', payload: event.target.checked });
    },
    [dispatch],
  );

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.every(todo => todo.completed)}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={items} />
    </section>
  );
});
