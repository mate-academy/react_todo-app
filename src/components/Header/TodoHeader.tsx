import { FC } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/types';
import { HeaderForm } from './HeaderForm';

interface IProps {
  todos: Todo[];
  addTodo: (newTodo: string) => void;
  toggleAll: (event: React.FormEvent) => void;
  allCompleted: boolean;
}

export const TodoHeader: FC<IProps> = ({
  todos,
  addTodo,
  toggleAll,
  allCompleted,
}) => {
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

      <HeaderForm addTodo={addTodo} />
    </header>
  );
};
