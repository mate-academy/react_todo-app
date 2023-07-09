import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodos, patchTodos } from '../../api/todos';
import { Loader } from '../Loader';

import './todo-item.css';

type Props = {
  todo: Todo
  todosGetter: () => void
  setDeleteError: (errorState: boolean) => void;
  setPostError: (errorState: boolean) => void;
  isClearCompleted: boolean,
  toggleActive: boolean
  toggleCompleted: boolean
};

export const TodoItem: FC<Props> = React.memo(
  ({
    todo,
    todosGetter,
    setDeleteError,
    setPostError,
    isClearCompleted,
    toggleActive,
    toggleCompleted,
  }) => {
    const { completed, title, id } = todo;

    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEdit] = useState(false);
    const [inputValue, setIsInputValue] = useState(title);

    const setFocusOnForm = () => {
      const inputElement
      = document
        .querySelector('.edit') as HTMLInputElement | null;

      if (inputElement) {
        inputElement.focus();
      }
    };

    const handeleCompletedStatus
    = (
      todoId: typeof id,
      currCompletedStatus: typeof completed,
    ) => {
      setIsLoading(true);
      patchTodos(todoId, { completed: !currCompletedStatus })
        .catch(setPostError)
        .finally(() => {
          todosGetter();
          setIsLoading(false);
        });
    };

    const handleDeleteTodos = () => {
      setIsLoading(true);

      deleteTodos(id)
        .catch(setDeleteError)
        .finally(() => {
          todosGetter();
          setIsLoading(false);
        });
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
      if (!inputValue.trim().length) {
        handleDeleteTodos();
      } else if (inputValue === title) {
        setIsEdit(false);
        event.currentTarget.blur();
      } else {
        setIsEdit(false);
        setIsLoading(true);
        patchTodos(id, { title: inputValue })
          .catch(setPostError)
          .finally(() => {
            setIsLoading(false);
            todosGetter();
          });
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.currentTarget.blur();
      } else if (event.key === 'Escape') {
        setIsEdit(false);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      setIsInputValue(value);
    };

    useEffect(() => {
      setFocusOnForm();
    }, [isEditing]);

    const loading
    = isLoading || isClearCompleted || toggleActive || toggleCompleted;

    return (
      <li className={cn({ completed }, { editing: isEditing })}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={completed}
            onChange={() => handeleCompletedStatus(id, completed)}
          />
          <label
            className={cn({ 'is-loading': loading })}
            onDoubleClick={() => setIsEdit(true)}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="Delete"
            onClick={handleDeleteTodos}
          />
        </div>

        {isEditing && (
          <input
            type="text"
            className="edit"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        )}

        {loading && <Loader />}
      </li>
    );
  },
);
