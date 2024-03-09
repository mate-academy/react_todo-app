import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../Types/Todo';
import { useTodos } from '../../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const { toggleCompletedTodo, handleDeleteTodo, handleEditTodo } = useTodos();
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [currentId, setCurrentId] = useState(0);

  const handleDoubleClick = () => {
    setEditValue(title);
    setCurrentId(id);
    setIsEditing(true);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const isEditingOrDeleting = (valueToEdit: string, todoId: number): void => {
    if (editValue) {
      handleEditTodo(todoId, valueToEdit);
    } else {
      handleDeleteTodo(todoId);
    }
  };

  const handleSaveChangesOnBlur = () => {
    isEditingOrDeleting(editValue, currentId);
  };

  useEffect(() => {
    const cancelEditing = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    };

    const editTodo = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isEditing) {
        isEditingOrDeleting(editValue, currentId);
        setIsEditing(false);
      }
    };

    window.addEventListener('keyup', cancelEditing);
    window.addEventListener('keypress', editTodo);

    return () => {
      window.removeEventListener('keyup', cancelEditing);
      window.removeEventListener('keypress', editTodo);
    };
  }, [isEditing, currentId, editValue, handleEditTodo]);

  return (
    <li
      onDoubleClick={handleDoubleClick}
      onBlur={() => setIsEditing(false)}
      className={cn({ editing: isEditing, completed })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => {
            toggleCompletedTodo(id);
          }}
          checked={completed}
        />
        <label>{title}</label>
        <button
          aria-label="delete Todo"
          onClick={() => handleDeleteTodo(id)}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={editInputRef}
        value={editValue}
        onChange={event => setEditValue(event.target.value)}
        onBlur={handleSaveChangesOnBlur}
        type="text"
        className="edit"
      />
    </li>
  );
};
