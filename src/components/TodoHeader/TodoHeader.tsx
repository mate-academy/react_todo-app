import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { addTodoOnServer } from '../../api/todos';

import { useAuth } from '../../hooks/useAuth';

import { Todo } from '../../types/Todo';
import { TodoToPost } from '../../types/TodoToPost';
import { OnShowErrorFunc } from '../../types/OnErrorFunc';
import { ErrorType } from '../../enums/ErrorType';

type Props = {
  isTodosEmpty: boolean;
  activeTodosNum: number;
  showError: OnShowErrorFunc;
  hideError: () => void;
  showTempTodo: (tempTodoTitle: string) => void;
  onAddNewTodo: (newTodo: Todo) => void;
  onToggleTodosStatus: () => void;
};

export const TodoHeader: React.FC<Props> = React.memo(
  ({
    isTodosEmpty,
    activeTodosNum,
    showError,
    hideError,
    showTempTodo,
    onAddNewTodo,
    onToggleTodosStatus,
  }) => {
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const newTodoInputRef = useRef<HTMLInputElement | null>(null);

    const { id: userId } = useAuth();

    useEffect(() => {
      newTodoInputRef.current?.focus();
    }, []);

    const handleAddNewTodo = async (
      event: React.FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      const title = newTodoTitle.trim();

      if (!title) {
        showError(ErrorType.EmptyTitle);

        return;
      }

      hideError();
      showTempTodo(title);

      setIsInputDisabled(true);

      const newTodo: TodoToPost = {
        userId,
        title,
        completed: false,
      };

      try {
        const createdTodo = await addTodoOnServer(userId, newTodo);

        onAddNewTodo(createdTodo);
      } catch {
        showError(ErrorType.Add);
      } finally {
        showTempTodo('');
        setNewTodoTitle('');
        setIsInputDisabled(false);
      }
    };

    return (
      <header className="todoapp__header">
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !activeTodosNum,
            'todoapp__toggle-all--hidden': isTodosEmpty,
          })}
          onClick={onToggleTodosStatus}
          aria-label="Toggle all todos"
        />

        <form onSubmit={handleAddNewTodo}>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
            disabled={isInputDisabled}
            ref={newTodoInputRef}
          />
        </form>
      </header>
    );
  },
);
