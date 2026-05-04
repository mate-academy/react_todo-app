import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Todo } from '../../type';
import classNames from 'classnames';
import {
  DeletingIdsContext,
  DoubleClickEditContext,
  ToggleTodosContext,
} from '../../TodosContext/Context';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const setDeleteTodo = useContext(DeletingIdsContext).setDeletingIds;
  const onClickDelete = useCallback(() => {
    setDeleteTodo(prev => [...prev, todo.id]);
  }, []);
  const setToggleTodo = useContext(ToggleTodosContext).setToggleTodo;
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isDoubleClicked, setIsDoubleClicked] = useState<number | null>(null);
  const setEditingTodo = useContext(DoubleClickEditContext).setEditingTodo;
  const clickEdit = isDoubleClicked === todo.id;
  const titleField = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && clickEdit) {
      titleField.current.focus();
    }
  }, [clickEdit]);

  const saveEdit = useCallback(() => {
    if (!editTitle.trim()) {
      setDeleteTodo(prev => [...prev, todo.id]);
    }

    if (editTitle === todo.title) {
      setIsDoubleClicked(null);
    } else {
      setEditingTodo({
        id: todo.id,
        title: editTitle.trim(),
        completed: todo.completed,
      });
      setIsDoubleClicked(null);
    }
  }, [editTitle]);

  const onSubmitEdit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      saveEdit();
    },
    [editTitle],
  );

  const onKeyDownEdit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setIsDoubleClicked(null);
      }
    },
    [],
  );

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          aria-label="Todo status"
          readOnly
          onChange={() =>
            setToggleTodo({
              id: todo.id,
              title: todo.title,
              completed: !todo.completed,
            })
          }
        />
      </label>
      {clickEdit && (
        <form onSubmit={onSubmitEdit}>
          <input
            ref={titleField}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={onKeyDownEdit}
            onBlur={saveEdit}
          />
        </form>
      )}

      {!clickEdit && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsDoubleClicked(todo.id);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={onClickDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
