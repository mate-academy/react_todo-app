/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodoType } from '../../types/types';
import { TodoContext } from '../../TodoContext';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const { removeTodo, toggleComplete, updateTodo } = useContext(TodoContext);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const todoStyle = () => {
    if (editMode) {
      return 'editing';
    }

    if (todo.completed) {
      return 'completed';
    }

    return 'view';
  };

  const handleUpdate = () => {
    if (!editedTitle) {
      removeTodo(todo.id);

      return;
    }

    if (editedTitle === todo.title) {
      setEditMode(false);
    }

    if (editedTitle !== todo.title) {
      updateTodo({ ...todo, title: editedTitle });
      setEditMode(false);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape': {
        setEditMode(false);
        setEditedTitle(todo.title);
        break;
      }

      case 'Enter': {
        handleUpdate();

        break;
      }

      default:
        // eslint-disable-next-line no-useless-return
        return;
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <li className={todoStyle()}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={() => toggleComplete(todo.id)}
          onChange={(event) => event}
          checked={todo.completed}
        />
        <label
          onDoubleClick={() => {
            setEditMode(true);
          }}
        >
          {editedTitle}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={event => setEditedTitle(event.currentTarget.value)}
        onKeyUp={handleKeyUp}
        ref={inputRef}
        onBlur={handleUpdate}
      />
    </li>
  );
};
