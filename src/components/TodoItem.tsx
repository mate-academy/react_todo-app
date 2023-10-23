import cn from 'classnames';

import {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Todo } from '../types';
import { TodosContext } from '../TodosContext';

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, removeTodo, editTodo } = useContext(TodosContext);
  const { id, title, completed } = todo;

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && isEditingMode) {
      titleField.current.focus();
    }
  }, [isEditingMode]);

  const handleTodoEditing = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        if (newTitle.trim()) {
          editTodo(id, newTitle);
          setIsEditingMode(false);
        } else {
          removeTodo(id);
        }

        break;

      case 'Escape':
        setIsEditingMode(false);
        break;

      default:
        break;
    }
  };

  const handleOnBlur = () => {
    if (newTitle.trim()) {
      editTodo(id, newTitle);
      setIsEditingMode(false);
    } else {
      removeTodo(id);
    }
  };

  return (
    <li className={cn({
      completed,
      editing: isEditingMode,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        <label
          onDoubleClick={() => setIsEditingMode(true)}
        >
          {title}
        </label>
        <button
          aria-label="title"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={titleField}
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
        onKeyUp={handleTodoEditing}
        onBlur={handleOnBlur}
      />
    </li>
  );
};
