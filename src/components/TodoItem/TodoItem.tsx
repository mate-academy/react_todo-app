import React, {
  FC, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodos, patchTodos } from '../../api/todos';
import { Loader } from '../Loader';
import { TodoContext } from '../TodoContext';

import './todo-item.css';

type Props = {
  todo: Todo
};

export const TodoItem: FC<Props> = React.memo(
  ({
    todo,
  }) => {
    const { completed, title, id } = todo;

    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEdit] = useState(false);
    const [inputValue, setIsInputValue] = useState(title);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const {
      isClearAllCompleted,
      isToggleAllCompleted,
      isToggleAllActive,
      getTodos: todosGetter,
      setIsDeleteError,
      setIsPostError,
    } = useContext(TodoContext);

    const isClearAllActive = useMemo(
      () => isClearAllCompleted && completed,
      [completed, isClearAllCompleted],
    );

    const setFocusOnForm = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handeleCompletedStatus
    = (
      todoId: typeof id,
      currCompletedStatus: typeof completed,
    ) => {
      setIsLoading(true);
      patchTodos(todoId, { completed: !currCompletedStatus })
        .catch(setIsPostError)
        .finally(() => {
          todosGetter();
          setIsLoading(false);
        });
    };

    const handleDeleteTodos = () => {
      setIsLoading(true);

      deleteTodos(id)
        .then(() => todosGetter())
        .catch(setIsDeleteError)
        .finally(() => {
          setIsLoading(false);
        });
    };

    const handleItemBlur
    = (event: React.FocusEvent<HTMLInputElement>) => {
      if (!inputValue.trim().length) {
        handleDeleteTodos();
      } else if (inputValue === title) {
        setIsEdit(false);
        event.currentTarget.blur();
      } else {
        setIsEdit(false);
        setIsLoading(true);
        patchTodos(id, { title: inputValue })
          .then(() => todosGetter())
          .catch(setIsPostError)
          .finally(() => {
            setIsLoading(false);
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
    = isLoading
    || isClearAllActive
    || isToggleAllActive
    || isToggleAllCompleted;

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
            ref={inputRef}
            type="text"
            className="edit"
            defaultValue={title}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleItemBlur}
          />
        )}

        {loading && <Loader />}
      </li>
    );
  },
);
