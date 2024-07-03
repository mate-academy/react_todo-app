import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext } from '../context/Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [textUpdate, setTextUpdate] = useState(todo.title);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'update',
      payload: { ...todo, completed: event.target.checked },
    });
  };

  const handleButtonClick = () => {
    dispatch({ type: 'delete', payload: todo.id });
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
            dispatch({
              type: 'update',
              payload: { ...todo, title: textUpdate },
            });
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
