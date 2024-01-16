import React, {
  ChangeEvent,
  useContext,
  useState,
  KeyboardEvent,
  FocusEvent,
  useRef,
  useEffect,
} from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../state/State';
import './TodoItem.scss';

type Props = {
  todo: Todo,
};

type EditTypes = KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>;

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(title);
  const [escapePressed, setEscapePressed] = useState(false);
  const dispatch = useContext(DispatchContext);

  const editInput = useRef(null);

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'toggle',
      payload: {
        id,
        status: event.target.checked,
      },
    });
  };

  const handleDelete = () => {
    dispatch({ type: 'delete', payload: id });
  };

  const hangleEditInput = (event: EditTypes) => {
    if (escapePressed) {
      if ((event as KeyboardEvent).key === 'Escape') {
        setEdit(false);
        setNewValue(title);
      }

      return;
    }

    if ((event as KeyboardEvent).code === 'Enter' || event.type === 'blur') {
      if (newValue.trim()) {
        dispatch({
          type: 'edit',
          payload: { value: newValue, id },
        });
      }

      dispatch({ type: 'delete', payload: id });
      setEdit(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEscapePressed(true);
    }
  };

  useEffect(() => {
    if (editInput.current !== null && edit) {
      (editInput.current as HTMLInputElement).focus();
    }
  }, [edit]);

  return (
    <li className="todoItem">
      <div className="todoItem__view">
        <input
          type="checkbox"
          checked={completed}
          className="todoItem__toggle"
          id={`toggle-view-${id}`}
          onChange={handleCheckbox}
        />

        <label
          htmlFor={`toggle-view-${id}`}
          className="todoItem__label"
          style={{
            opacity: completed ? 0.5 : 1,
            textDecoration: completed ? 'line-through' : 'none',
            display: edit ? 'none' : 'block',
          }}
          onDoubleClick={() => setEdit(!edit)}
        >
          {title}
        </label>

        <input
          ref={editInput}
          type="text"
          className="todoItem__edit"
          value={newValue}
          style={{
            display: edit ? 'block' : 'none',
          }}
          onFocus={() => setEscapePressed(false)}
          onBlur={hangleEditInput}
          onChange={event => setNewValue(event.target.value)}
          onKeyUp={hangleEditInput}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className="todoItem__destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>
    </li>
  );
};
