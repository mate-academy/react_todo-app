import React, { useCallback, useContext, useState } from 'react';

import { DispatchContext } from '../states/TodosContext';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  const dispatch = useContext(DispatchContext);
  const [isEnabledAll, setIsEnabledAll] = useState(true);

  const toggleAll = useCallback(() => {
    setIsEnabledAll(prevState => !prevState);

    dispatch({
      type: 'toggleAll',
      payload: { type: isEnabledAll },
    });
  }, [dispatch, isEnabledAll]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {
          todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))
        }
      </ul>
    </section>
  );
});
