import classNames from 'classnames';
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../Types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  todo: Todo,
  handleComplete: (selectedTodoId: number) => void,
  handleDelete: (selectedTodoId: number) => void,
  handleEdit: (selectedTodoId: number, editingValue: string) => void,
}

export const TodoItem: React.FC<Props> = ({
  todo,
  handleComplete,
  handleDelete,
  handleEdit,
}) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(title);
  const editingInputRef = useRef<HTMLInputElement>(null);

  const handleCompleteChange = (selectedTodoId: number) => {
    handleComplete(selectedTodoId);
  };

  const handleDeleteClick = (selectedTodoId: number) => {
    handleDelete(selectedTodoId);
  };

  const handleEditSumbit = (event: FormEvent, selectedTodoId: number) => {
    event.preventDefault();

    if (editingValue) {
      handleEdit(selectedTodoId, editingValue);
    } else {
      handleDelete(selectedTodoId);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEditingValue(title);
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    setEditingValue(title);
    setIsEditing(true);
    setTimeout(() => {
      editingInputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <li className={classNames(
      { completed },
      { editing: isEditing },
    )}
    >
      <form onSubmit={(event) => handleEditSumbit(event, id)}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={completed}
            onChange={() => handleCompleteChange(id)}
          />
          <label
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => handleDeleteClick(id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={editingValue}
          onChange={(event) => setEditingValue(event.target.value)}
          ref={editingInputRef}
        />
      </form>
    </li>
  );
};
