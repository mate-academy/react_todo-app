import { FC, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoLoader } from '../TodoLoader/TodoLoader';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => Promise<void>;
  updateStatusTodo?: (todo: Todo) => void;
  idsToChange?: number[];
  editTitleTodo: (todo: Todo, title: string) => void;
};

export const TodoItem:FC<Props> = ({
  todo,
  onDelete,
  updateStatusTodo,
  idsToChange = [],
  editTitleTodo,
}) => {
  const {
    title,
    completed,
    id,
  } = todo;
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);

  const handleUpdate = () => {
    if (updateStatusTodo) {
      updateStatusTodo(todo);
    }
  };

  const handleEdit = () => {
    if (editTitleTodo) {
      editTitleTodo(todo, newTitle);
    }

    if (!newTitle.length) {
      onDelete(id);
    }

    setEditing(false);
  };

  return (
    <li
      data-cy="Todo"
      className={classNames('todo',
        { completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleUpdate}
        />
      </label>

      {editing
        ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleEdit();
            }}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTitle}
              onBlur={handleEdit}
              onChange={event => setNewTitle(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Escape') {
                  setEditing(false);
                }
              }}
            />
          </form>
        )
        : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setEditing(true)}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
              onClick={() => onDelete(id)}
            >
              ×
            </button>
          </>
        )}

      <TodoLoader
        isAdding={todo.id === 0}
        isDeleting={idsToChange.includes(todo.id)}
      />

    </li>
  );
};
