import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { TodoUpdateContext, TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

interface Props {
  todoItem: Todo,
}

export const TodoItem: React.FC<Props> = ({ todoItem }) => {
  const { id, title, completed } = todoItem;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const { todos, setTodos } = useContext(TodosContext);
  const { deleteTodo, editTodo } = useContext(TodoUpdateContext);

  const handleOnChange = () => setTodos(todos.map((todo: Todo) => (
    todo.id === id
      ? {
        ...todo,
        completed: !completed,
      }
      : todo
  )));

  const saveEditing = () => {
    if (!editTitle.trim()) {
      deleteTodo(id);
    }

    if (editTitle.trim()) {
      setIsEditing(false);
      editTodo(id, editTitle);
    }
  };

  const handleOnEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveEditing();
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(title);
    }
  };

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleOnChange}
        />
        <label onDoubleClick={() => setIsEditing(true)}>
          {title}
        </label>
        <button
          aria-label="toggle-view"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>

      {isEditing && (
        <input
          ref={titleField}
          onBlur={saveEditing}
          type="text"
          className="edit"
          value={editTitle}
          onChange={handleOnEditing}
          onKeyUp={handleKeyUp}
        />
      )}
    </li>
  );
};
