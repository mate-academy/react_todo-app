import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { ActionTypes } from '../../types/ActionTypes';
import { useDispatch, useStateValue } from '../../GlobalProvider';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoElement = ({ todo }: Props) => {
  const [value, setValue] = useState(todo?.title || '');

  const dispatch = useDispatch();
  const { selectedTodoId } = useStateValue();

  const isEditing = selectedTodoId === todo.id;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    dispatch({
      type: ActionTypes.EDIT_TODO,
      payload: {
        id: todo.id,
        title: value.trim(),
        completed: todo.completed,
      },
    });
    dispatch({ type: ActionTypes.SELECT_TODO, payload: null });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={todo.id.toString()}>
        <input
          id={todo.id.toString()}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() =>
            dispatch({ type: ActionTypes.TOGGLE_TODO, payload: todo.id })
          }
        />
      </label>

      {isEditing ? (
        <form>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={value}
            onChange={event => setValue(event.target.value)}
            onBlur={handleSubmit}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSubmit();
              }

              if (e.key === 'Escape') {
                setValue(todo.title);
                dispatch({ type: ActionTypes.SELECT_TODO, payload: null });
              }
            }}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() =>
            dispatch({ type: ActionTypes.SELECT_TODO, payload: todo.id })
          }
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() =>
            dispatch({ type: ActionTypes.REMOVE_TODO, payload: todo.id })
          }
        >
          ×
        </button>
      )}
    </div>
  );
};
