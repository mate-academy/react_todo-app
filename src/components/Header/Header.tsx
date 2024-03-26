/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../context';
import { useAppSelector } from '../../app/hooks/useAppSelector';

type Props = {
  newTodoTitle: string,
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>,
  isActive: boolean,
  onToggleAll: () => Promise<void>,
};

export const Header: React.FC<Props> = React.memo(
  ({
    newTodoTitle,
    setNewTodoTitle,
    isActive,
    onToggleAll,
  }) => {
    const { onAdd } = useContext(TodosContext);
    const { isUpdating } = useAppSelector(state => state.todos);

    return (
      <header className="todoapp__header">
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isActive,
          })}
          onClick={() => onToggleAll()}
        />

        <form onSubmit={onAdd}>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
            disabled={isUpdating}
          />
        </form>
      </header>
    );
  },
);
