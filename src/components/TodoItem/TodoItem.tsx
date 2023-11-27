import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { title, completed } = todo;
  const dispatch = useContext(DispatchContext);

  const [editedTitle, setEditedTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const inputref = useRef<HTMLInputElement>(null);

  const handleEditSubmit = () => {
    if (!editedTitle.trim()) {
      dispatch({ type: 'deleteTodo', payload: todo });

      return;
    }

    dispatch({ type: 'editTodo', payload: { ...todo, title: editedTitle } });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        handleEditSubmit();
        break;

      case 'Escape':
        handleEditCancel();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (inputref.current && isEditing) {
      inputref.current.focus();
    }
  }, [isEditing]);

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
          checked={completed}
          id="toggle-view"
          className="toggle"
          onChange={() => dispatch({ type: 'toggleCompletion', payload: todo })}
        />

        <label onDoubleClick={() => setIsEditing(true)}>
          {title}
        </label>

        <button
          type="button"
          data-cy="deleteTodo"
          aria-label="Delete todo"
          className="destroy"
          onClick={() => dispatch({ type: 'deleteTodo', payload: todo })}
        />
      </div>
      <input
        type="text"
        value={editedTitle}
        ref={inputref}
        className="edit"
        onChange={event => setEditedTitle(event.target.value)}
        onBlur={handleEditSubmit}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
});
