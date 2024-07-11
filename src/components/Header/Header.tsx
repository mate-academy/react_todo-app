import { useMemo } from 'react';
import cn from 'classnames';

import { useDispatch, useStore } from '../../store';
import { UPDATE_TODO } from '../../utils/actionTypes';
import { CreateTodoForm } from '../CreateTodoForm/CreateTodoForm';

export const Header = () => {
  const { todos } = useStore();
  const dispatch = useDispatch();

  const isAllCompleted = useMemo(
    () => todos.every(({ completed }) => completed),
    [todos],
  );

  const handleToggleCompleted = () => {
    todos.forEach(({ id }) => {
      dispatch({
        type: UPDATE_TODO,
        payload: { id, completed: !isAllCompleted },
      });
    });
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isAllCompleted,
        })}
        data-cy="ToggleAllButton"
        onClick={handleToggleCompleted}
      />

      <CreateTodoForm />
    </header>
  );
};
