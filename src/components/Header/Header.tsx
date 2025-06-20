import React from 'react';
import { AddTodoForm } from '../AddTodoForm';
import cn from 'classnames';
import { useTodoContext } from '../../store/useTodoContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { isThereAlLeastOneTodo, isAllTodosCompleted, onToggleTodos } =
    useTodoContext();

  return (
    <header className="todoapp__header">
      {isThereAlLeastOneTodo && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllTodosCompleted })}
          data-cy="ToggleAllButton"
          onClick={onToggleTodos}
        />
      )}

      <AddTodoForm />
    </header>
  );
};
