import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { KeyUp } from '../../types/ItemKeyPress';
import { DispatchContext } from '../TodosContext';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const editedInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editedInputRef.current) {
      editedInputRef.current.focus();
    }
  }, [isEditing]);

  const onComplete = (itemId: number) => {
    dispatch({
      type: 'complete',
      payload: itemId,
    });
  };

  const onDelete = (itemId: number) => {
    dispatch({
      type: 'delete',
      payload: itemId,
    });
  };

  const onEdit = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'edit',
        payload: {
          id: todo.id,
          value: editedTitle,
        },
      });
    } else {
      dispatch({
        type: 'delete',
        payload: todo.id,
      });
    }

    setIsEditing(false);
  };

  const handleKeyClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case KeyUp.Esc:
        setEditedTitle(todo.title);
        setIsEditing(false);
        break;

      case KeyUp.Enter:
        onEdit();
        break;

      default:
        break;
    }
  };

  const { id, completed } = todo;

  return (
    <li
      key={id}
      className={cn({
        // eslint-disable-next-line object-shorthand
        completed: completed,
        editing: isEditing,
      })}
    >
      <div
        className="view"
        onDoubleClick={() => setIsEditing(true)}
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => onComplete(id)}
        />
        <label>{todo.title}</label>
        <button
          aria-label="delete"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(id)}
        />
      </div>
      <input
        ref={editedInputRef}
        value={editedTitle}
        type="text"
        className="edit"
        onChange={event => setEditedTitle(event.target.value)}
        onBlur={onEdit}
        onKeyUp={handleKeyClick}
      />
    </li>
  );
};
