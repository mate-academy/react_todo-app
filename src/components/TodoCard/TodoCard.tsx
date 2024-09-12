/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types';
import classNames from 'classnames';

import TodosContext from '../../contexts/Todos/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoCard = ({ todo }: Props) => {
  const { deleteTodo, updateTodo } = TodosContext.useContract();

  const [isEditing, setIsEditing] = useState(false);

  const editRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
    }
  }, [isEditing]);

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const title = (formData.get('title') as string).trim();

    if (todo.title === title) {
      setIsEditing(false);

      return;
    }

    if (!title) {
      deleteTodo(todo.id);
    } else {
      updateTodo(todo.id, { title });
    }

    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handeleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancelKeypress = (
    event: React.KeyboardEvent<HTMLFormElement>,
  ) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      onDoubleClick={handeleEditStart}
    >
      <label className="todo__status-label">
        <input
          onClick={handleToggleComplete}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      {isEditing ? (
        <form
          onKeyUp={handleEditCancelKeypress}
          onSubmit={handleEdit}
          onBlur={handleEdit}
        >
          <input
            ref={editRef}
            name="title"
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.title}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}

          <button
            onClick={handleDeleteTodo}
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
