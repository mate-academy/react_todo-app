import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';
import { TodosContext } from '../../Context/TodosContext';

type Props = {
  id: string,
  title: string,
  completed: boolean,
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ id, title, completed }) => {
  const { completedTodo, editTodo, deleteItem } = useContext(TodosContext);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && title) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleDone = () => {
    completedTodo(id);
  };

  const handleEditTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTitle.trim()) {
        editTodo(newTitle, id);
      }

      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li
      key={id}
      className={cn({ completed: completed, editing: isEditing })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${id}`}
          onClick={handleDone}
          checked={completed}
        />

        <label htmlFor={`toggle-${id}`}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteItem(id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onKeyUp={handleEditTodo}
        ref={titleField}
      />
    </li>
  );
};
