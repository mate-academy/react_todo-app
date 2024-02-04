import classNames from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../variables/TodosContext.1';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const {
    setCompleted,
    deleteTodo,
    saveEditingTitle,
  } = useContext(TodosContext);
  const [isEdeting, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const titleFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleFocus.current) {
      titleFocus.current.focus();
    }
  }, [isEdeting]);

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editingTitle.trim()) {
        saveEditingTitle(todo.id, editingTitle.trim());
        setEditingTitle(editingTitle.trim());
        setIsEditing(false);
      } else {
        deleteTodo(todo.id);
      }
    }

    if (event.key === 'Escape') {
      if (!editingTitle.trim()) {
        setIsEditing(false);
        setEditingTitle(todo.title);
      } else {
        setIsEditing(false);
        setEditingTitle(todo.title);
      }
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames({
        completed: todo.completed,
        editing: isEdeting,

      })}
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={() => setCompleted(todo.id)}
        />
        <label onDoubleClick={() => {
          setIsEditing(true);
        }}
        >
          {todo.title}
        </label>

        <button
          aria-label="toggle-view"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />

      </div>
      <input
        type="text"
        className="edit"
        value={editingTitle.trim()}
        onChange={(event) => setEditingTitle(event.currentTarget.value)}
        onBlur={() => {
          setIsEditing(false);
          saveEditingTitle(todo.id, editingTitle.trim());
        }}
        ref={titleFocus}
        onKeyUp={(event) => handleOnKeyUp(event)}
      />
    </li>
  );
};
