import React, {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../../Loader';

type Props = {
  todo: Todo,
  removeTodo: (todoId: number) => void,
  isToggleAll: boolean,
  handleUpdateTodoFormSubmit: (
    id: number,
    completed?: boolean,
    newTitle?: string,
  ) => void,
  isOnRender: boolean,
};

export const TodoItem: FC<Props> = React.memo(({
  todo,
  removeTodo,
  isToggleAll,
  handleUpdateTodoFormSubmit,
  isOnRender,
}) => {
  const { title, id } = todo;

  const [completed, setCompleted] = useState(todo.completed);
  const [updateTodoTitle, setUpdateTodoTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(title);
  const [isCancel, setIsCancel] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (updateTodoTitle) {
      inputRef.current?.focus();
    }
  }, [updateTodoTitle]);

  useEffect(() => {
    setCompleted(todo.completed);
    setNewTodoTitle(title);
    setIsCancel(false);
  }, [todo.completed, title, isCancel]);

  const handleChange = async (todoId: number, todoCompleted: boolean) => {
    handleUpdateTodoFormSubmit(todoId, !completed);

    if (isOnRender) {
      setCompleted(!todoCompleted);
    }
  };

  const handleDblClick = () => {
    setUpdateTodoTitle(true);
  };

  const saveNewUpdateTodoTitle = (cansel?: boolean) => {
    if (newTodoTitle.length === 0) {
      removeTodo(id);
      setIsLoading(false);
    } else if (newTodoTitle !== title && !cansel) {
      setUpdateTodoTitle(false);
      setIsLoading(true);

      handleUpdateTodoFormSubmit(id, completed, newTodoTitle);
    }

    setUpdateTodoTitle(false);
    setIsLoading(false);
  };

  const cancelChanges = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      saveNewUpdateTodoTitle(true);
      setIsCancel(true);
    }

    if (e.key === 'Enter') {
      saveNewUpdateTodoTitle();
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [todo.completed, title]);

  const loadingContext = useContext(Loader);

  return (
    <div
      className={classNames(
        'todo',
        { completed },
      )}
      onDoubleClick={handleDblClick}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={() => handleChange(id, todo.completed)}
        />
      </label>

      {updateTodoTitle ? (
        <input
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onBlur={() => saveNewUpdateTodoTitle()}
          onKeyUp={cancelChanges}
          ref={inputRef}
        />
      ) : (
        <>
          <span className="todo__title">{title}</span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => removeTodo(id)}
          >
            ×
          </button>
        </>
      )}

      <div
        className={classNames(
          'modal overlay',
          {
            'is-active': loadingContext.includes(id)
            || isToggleAll
            || isLoading,
          },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
