import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
  onCheckedChange: (t: Todo) => void;
  onDeleteTodo: (id: number) => void;
  onTextUpdate: (updTodo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onCheckedChange,
  onDeleteTodo,
  onTextUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textUpdate, setTextUpdate] = useState(todo.title);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange({ ...todo, completed: event.target.checked });
  };

  const handleButtonClick = () => {
    onDeleteTodo(todo.id);
  };

  const handleTextUpdate = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTextUpdate(event.target.value);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }, [isEditing]);

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
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
      </label>
      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEditing(true);
            }}
          >
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleButtonClick}
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={(event: React.FormEvent) => {
            event.preventDefault();
            onTextUpdate({ ...todo, title: textUpdate });
            setIsEditing(false);
          }}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={textUpdate}
            onChange={handleTextUpdate}
            onBlur={() => {
              setIsEditing(false);
              setTextUpdate(todo.title);
            }}
          />
        </form>
      )}
    </div>
  );
};
