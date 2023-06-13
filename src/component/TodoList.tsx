import classNames from 'classnames';
import { useState, useRef } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos:Todo[],
  todo: Todo,
  handleDeleteTodo: (id: number) => void,
  handleUpdateStatus: (id: number) => void,
  handleUpdateTitle: (id: number, newTitle: string) => void,
  processing: number[],
};

export const TodoList: React.FC<Props> = ({
  todo,
  handleDeleteTodo,
  handleUpdateStatus,
  handleUpdateTitle,
  processing,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const input = useRef<HTMLInputElement | null>(null);
  const isLoading = todo.id && processing.includes(todo.id);

  const handleTitleSubmit = () => {
    if (title === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!todo.title.trim()) {
      handleDeleteTodo(todo.id);
    }

    handleUpdateTitle(todo.id, title);
    setIsEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleTitleSubmit();
  };

  const cancelEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setTitle(todo.title);
    }
  };

  return (
    <ul>
      <li>
        <section className="todoapp__main">
          <div
            key={todo.id}
            className={classNames(
              'todo',
              { completed: todo.completed },
            )}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => {
                  handleUpdateStatus(todo.id);
                }}
              />
            </label>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <input
                  ref={input}
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyUp={cancelEditing}
                />
              </form>
            ) : (
              <>
                <span
                  className="todo__title"
                  onDoubleClick={() => setIsEditing(true)}
                >
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  ×
                </button>
                <div
                  className={classNames(
                    'modal overlay',
                    { 'is-active': isLoading },
                  )}
                >
                  <div
                    className="modal-background has-background-white-ter"
                  />
                  <div
                    className="loader"
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </li>
    </ul>
  );
};
