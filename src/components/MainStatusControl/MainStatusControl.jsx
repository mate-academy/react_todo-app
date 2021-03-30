import React, { useContext, useCallback, useMemo } from 'react';

import classNames from 'classnames';
import { TodosContext } from '../../utils/TodosContext';
import { toggleAll } from '../../utils/helpers';
import { updateAllTodos } from '../../utils/api';

export const MainStatusControl = React.memo(() => {
  const { todos, setTodos } = useContext(TodosContext);

  const isCompleted = useMemo(() => toggleAll(todos), [todos]);
  const handleToggleAll = useCallback((status) => {
    const newTodos = todos.map(todo => ({ ...todo, completed: !status }));

    setTodos(newTodos);
    updateAllTodos(newTodos);
  }, [todos, setTodos]);

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className={classNames('toggle-all')}
        checked={isCompleted}
        onChange={() => handleToggleAll(isCompleted)}
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
    </>
  );
});
