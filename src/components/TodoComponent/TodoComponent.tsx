/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useDispatch } from '../../GlobalProvider';

type Props = {
  todo: Todo;
};

export const TodoComponent: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch({ type: 'setIsFocused', payload: { isFocusNeed: true } });

    dispatch({
      type: 'updateTodo',
      payload: {
        todo: todo,
        updatedData: { completed: !todo.completed },
      },
    });
  };

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [query, setQuery] = useState(todo.title);

  const handleDelete = () => {
    dispatch({ type: 'setIsFocused', payload: { isFocusNeed: true } });

    dispatch({
      type: 'deleteTodo',
      payload: { todo: todo },
    });
  };

  const handleSave = () => {
    setIsBeingEdited(false);

    if (query === todo.title) {
      return;
    }

    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      handleDelete();

      return;
    }

    dispatch({
      type: 'updateTodo',
      payload: {
        todo: todo,
        updatedData: { title: trimmedQuery },
      },
    });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {!isBeingEdited && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsBeingEdited(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}

      {isBeingEdited && (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSave();
          }}
          onKeyUp={event => {
            if (event.key === 'Escape') {
              setIsBeingEdited(false);
              setQuery(todo.title);
            }
          }}
          onBlur={handleSave}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={event => setQuery(event.target.value)}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
