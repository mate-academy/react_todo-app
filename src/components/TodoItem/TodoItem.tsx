/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodosDispatch } from '../../contexts/TodosContext';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { completed, title } = item;

  const dispatch = useTodosDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleStatusToggle = () => {
    dispatch({ type: 'toggle completed status', payload: item });
  };

  const handleDeleting = () => {
    dispatch({ type: 'remove', payload: item });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleEditingSubmit = () => {
    const newTitle = editedTitle.trim();

    if (newTitle !== title) {
      if (newTitle.length < 1) {
        dispatch({ type: 'remove', payload: item });
      } else {
        const editedTodo = {
          ...item,
          title: newTitle,
        };

        dispatch({ type: 'edit title', payload: editedTodo });
      }
    }

    setIsEditing(false);
    setEditedTitle(newTitle);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEditingSubmit();
    }

    if (event.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  const defineIdStatus = useCallback(() => {
    if (completed) {
      return 'toggle-completed';
    }

    if (isEditing) {
      return 'toggle-editing';
    }

    return 'toggle-view';
  }, [completed, isEditing]);

  return (
    <li
      className={cn({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={defineIdStatus()}
          onChange={handleStatusToggle}
          checked={completed}
        />

        <label onDoubleClick={handleDoubleClick}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleting}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={handleTitleEditing}
        onBlur={handleEditingSubmit}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
