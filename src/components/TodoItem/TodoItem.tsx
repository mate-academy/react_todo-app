import {
  ChangeEvent,
  useContext,
  useState,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../state/State';

type Props = {
  todo: Todo,
};

type EditTypes = KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(title);
  const [escapePressed, setEscapePressed] = useState(false);
  const dispatch = useContext(DispatchContext);

  const handleChecbox = (event: ChangeEvent<HTMLInputElement>) => {
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
      dispatch({
        type: 'edit',
        payload: { value: newValue, id },
      });

      setEdit(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEscapePressed(true);
    }
  };

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          id={`toggle-view-${id}`}
          onChange={handleChecbox}
        />
        <label
          htmlFor={`toggle-view-${id}`}
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
          type="text"
          className="edit"
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
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>

      <input type="text" className="edit" />
    </li>
  );
};
