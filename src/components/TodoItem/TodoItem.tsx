import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const onComplete = (itemId: number) => {
    dispatch({
      type: 'toggleComplete',
      payload: itemId,
    });
  };

  const onRemove = (itemId: number) => {
    dispatch({
      type: 'remove',
      payload: itemId,
    });
  };

  const onEdit = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'edit',
        payload: { id: todo.id, newValue: editedTitle },
      });
    } else {
      dispatch({
        type: 'remove',
        payload: todo.id,
      });
    }

    setIsEditing(false);
  };

  const handleEditControls = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        setEditedTitle(todo.title);
        setIsEditing(false);
        break;

      case 'Enter':
        onEdit();
        break;

      default:
        break;
    }
  };

  return (
    <li
      key={todo.id}
      className={cn({
        completed: todo.completed,
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
          checked={todo.completed}
          onChange={() => onComplete(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          aria-label="delete"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onRemove(todo.id)}
        />
      </div>
      <input
        ref={editInputRef}
        value={editedTitle}
        type="text"
        className="edit"
        onChange={e => setEditedTitle(e.target.value)}
        onBlur={onEdit}
        onKeyUp={handleEditControls}
      />
    </li>
  );
};
