import { FC, useContext } from 'react';
import classNames from 'classnames';

import { HeaderForm } from './HeaderForm';
import { TodoContext } from '../../Context/TodoContext';

export const TodoHeader: FC = () => {
  const { todos, dispatch, allCompleted } = useContext(TodoContext);

  const handleToggleAll = () => {
    dispatch({ type: 'CHECK_ALL_TODO' });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <HeaderForm />
    </header>
  );
};
