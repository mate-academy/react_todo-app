import classNames from 'classnames';
import { Todo as TodoType } from '../types/Todo';
import { useTodos } from '../context/TodosProvider';
import { useRef, useState } from 'react';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { dispatch } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(title);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setIsEditing(false);

    if (title === inputText) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (inputText.trim().length === 0) {
        dispatch({ type: 'DELETE_TODO', payload: id });
      } else {
        dispatch({
          type: 'EDIT_TODO',
          payload: { id, newTitle: inputText.trim() },
        });
      }

      setLoading(false);
    }, 1000);
  };

  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setInputText(title);
    }
  });

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
      onDoubleClick={handleDoubleClick}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: id })}
        />
      </label>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onBlur={handleSubmit}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'DELETE_TODO', payload: id })}
          >
            ×
          </button>
        </>
      )}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': loading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
