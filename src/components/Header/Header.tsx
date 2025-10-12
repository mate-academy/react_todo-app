import React, { useState } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';
import { useTodosContext } from '../../contexts/TodosContext';
import { useErrorContext } from '../../contexts/ErrorContext';
import { getCheckCompleted } from '../../utils/getCheckCompleted';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');

  const { todos, actions } = useTodosContext();
  const { setErrorMessage, setIsHiddenErrorMessage } = useErrorContext();

  const checkCompleted = getCheckCompleted(todos);

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: checkCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={actions.toggle}
        />
      )}

      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const cleanTitle = title.trim();

          if (cleanTitle !== '') {
            actions.add({
              title: cleanTitle,
              completed: false,
            });
            setTitle('');
          } else {
            setErrorMessage(ErrorMessage.emptyTitleError);
            setIsHiddenErrorMessage(false);
          }
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
