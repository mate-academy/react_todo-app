/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useTodos } from '../../context/context';

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { deleteTodo, tempTodo, toggleTodo, editTodo } = useTodos();
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleDobleClick = () => {
    setIsOpenEditForm(true);

    setTimeout(() => {
      editInputRef.current?.focus();
    }, 0);
  };

  const editTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const newTitle = form.get('TodoTitleField') as string;

    if (!newTitle.trim()) {
      deleteTodo(todo.id);
    }

    if (newTitle !== todo.title) {
      editTodo(newTitle.trim(), todo.id);
    }

    setTimeout(() => {
      setIsOpenEditForm(false);
    }, 100);
  };

  const handleTitleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();

    if (!newTitle) {
      deleteTodo(todo.id);
    }

    if (newTitle !== todo.title) {
      editTodo(newTitle, todo.id);
    }

    setIsOpenEditForm(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpenEditForm(false);
    }
  };

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
          defaultChecked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {!isOpenEditForm ? (
        tempTodo?.id === todo.id ? (
          <span data-cy="TodoTitle" className="todo__title">
            Todo is being saved now
          </span>
        ) : (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDobleClick}
          >
            {todo.title}
          </span>
        )
      ) : (
        <form onSubmit={editTitle}>
          <input
            data-cy="TodoTitleField"
            name="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.title}
            ref={editInputRef}
            onBlur={handleTitleBlur}
            onKeyUp={handleKeyUp}
          />
        </form>
      )}

      {!isOpenEditForm && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TodoItem;
