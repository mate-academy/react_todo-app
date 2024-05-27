import { ChangeEvent, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  removeTodo = () => {},
  updateTodo = () => {},
}) => {
  const { id, title, completed } = todo;

  const [isEdit, setIsEdit] = useState({ id: 0, title: '' });

  const handleDoubleClick = (task: Todo) => {
    setIsEdit({ id: task.id, title: task.title });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit({ ...isEdit, title: event.target.value });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedTitle = isEdit.title.trim();

      if (trimmedTitle) {
        updateTodo(isEdit.id, trimmedTitle);
      } else {
        removeTodo(isEdit.id);
      }

      setIsEdit({ id: 0, title: '' });
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEdit({ id: 0, title: '' });
    }
  };

  const handleBlur = () => {
    const trimmedTitle = isEdit.title.trim();

    if (trimmedTitle) {
      updateTodo(isEdit.id, trimmedTitle);
    } else {
      removeTodo(isEdit.id);
    }

    setIsEdit({ id: 0, title: '' });
  };

  return (
    <>
      <div
        key={id}
        data-cy="Todo"
        className={cn('todo', { completed: completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={() => toggleTodo(id)}
          />
        </label>
        {isEdit.id === id ? (
          <form>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={isEdit.title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onBlur={handleBlur}
              autoFocus
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleDoubleClick(todo)}
            >
              {title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => removeTodo(id)}
            >
              x
            </button>
          </>
        )}
      </div>
    </>
  );
};
