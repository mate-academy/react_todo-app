import classNames from 'classnames';
import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useEffect,
  memo,
} from 'react';
import { useTodos } from './hooks/useTodos';
import { useInput } from './hooks/useInput';
import { Todo } from './types/Todo';

interface TodoProps {
  todo: Todo;
}

export const Task: React.FC<TodoProps> = memo(({ todo }) => {
  const { changeTodoStatus, deleteTodo, updateTodoTitle } = useTodos();
  const { value, handleChange, reset } = useInput(todo.title);

  const [editing, setEditing] = useState(false);

  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editRef.current) {
      editRef.current.focus();
    }
  });

  // #region handlers
  const handleDoubleClick = () => {
    setEditing(!editing);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
  };

  const handleBlur = () => {
    if (value.trim()) {
      updateTodoTitle(todo.id, value.trim());
    } else {
      deleteTodo(todo.id);
    }

    setEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    } else if (event.key === 'Escape') {
      reset();

      setEditing(false);
    }
  };
  // #endregion

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
          onChange={() => changeTodoStatus(todo.id)}
          checked={todo.completed}
        />
      </label>

      {!editing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            x
          </button>
        </>
      ) : (
        <>
          <form>
            <input
              ref={editRef}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={value}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </form>
        </>
      )}
    </div>
  );
});

Task.displayName = 'Task';
