import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { DispatchContext } from '../../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const dispatch = useContext(DispatchContext);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setIsRenaming(false);
  }, [todo]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const handelDeleteTodo = (todoId: number) => {
    dispatch({ type: 'deleteTodo', payload: todoId });
  };

  const handleSubmit = () => {
    const normalizedNewTitle = newTitle.trim();

    if (normalizedNewTitle === title) {
      setIsRenaming(false);

      return;
    }

    if (!normalizedNewTitle) {
      dispatch({ type: 'deleteTodo', payload: id });

      return;
    }

    setNewTitle(normalizedNewTitle);
    dispatch({
      type: 'updateTodo',
      payload: { ...todo, title: normalizedNewTitle },
    });
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setNewStatus',
      payload: { ...todo, completed: event.target.checked },
    });
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
      key={id}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          id={`${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleChangeStatus}
        />
      </label>

      {isRenaming ? (
        <form
          onSubmit={handleSubmit}
          onBlur={handleSubmit}
          onKeyUp={event => {
            if (event.key === 'Escape') {
              setIsRenaming(false);
            }
          }}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsRenaming(true);
              setNewTitle(title);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handelDeleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
