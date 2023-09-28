/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import className from 'classnames';
import { TaskType } from '../../types/TaskType';
import { TodosContext } from '../TodoContext/TodoContext';

type Props = {
  todo: TaskType,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const {
    handleStatusChange,
    handleRemove,
    handleSave,
  } = useContext(TodosContext);
  const [isEditable, setIsEditable] = useState(false);
  const [editedTodo, setEditedTodo] = useState(title);

  const fieldTitle = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (fieldTitle.current && isEditable) {
      fieldTitle.current.focus();
    }
  }, [isEditable]);

  const handleChangeTitleTodo = (
    event:React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditedTodo(event.target.value);
  };

  const handleKeyboardAction = (event: React.KeyboardEvent) => {
    const { key } = event;

    switch (key) {
      case 'Enter':
        if (editedTodo.trim().length) {
          handleSave(id, editedTodo);
          setIsEditable(false);
        } else {
          handleRemove(id);
        }

        break;

      case 'Escape':
        setIsEditable(false);
        break;

      default:
        break;
    }
  };

  return (
    <li
      className={className({
        completed: todo.completed,
        editing: isEditable,
      })}
      onDoubleClick={() => setIsEditable(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => handleStatusChange(id)}
        />
        <label
          onDoubleClick={() => setIsEditable(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleRemove(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={fieldTitle}
        value={editedTodo}
        onChange={handleChangeTitleTodo}
        onKeyUp={handleKeyboardAction}
        onBlur={() => handleSave(id, editedTodo)}
      />
    </li>
  );
};
