import { FC, useContext } from 'react';
import classNames from 'classnames';

import { HeaderForm } from './HeaderForm';
import { TodoContext } from '../../Context/TodoContext';

export const TodoHeader: FC = () => {
  const { todos, toggleAll, allCompleted } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <HeaderForm />
    </header>
  );
};
