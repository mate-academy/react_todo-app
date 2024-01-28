import cn from 'classnames';
import { useContext, useState } from 'react';
import { Todo } from './Types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);
  const [title, setTitle] = useState(todo.title);
  const { editToDo, toggleToDo, removeTodo } = useContext(TodosContext);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleChecked = (id: number) => {
    toggleToDo(id);
  };

  const handleSaveChanges = () => {
    const trimmedTitle = tempTitle.trim();

    if (trimmedTitle) {
      editToDo(todo.id, tempTitle);
    } else {
      removeTodo(todo.id);
    }

    setTitle(trimmedTitle);

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveChanges();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempTitle(title);
    }
  };

  return (
    <li className={cn({ completed: todo.completed, editing: isEditing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => handleChecked(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
          aria-label="delete"
        />
      </div>

      {isEditing && (
        <input
          type="text"
          className="edit"
          value={tempTitle}
          onChange={handleInputChange}
          onBlur={handleSaveChanges}
          onKeyDown={handleKeyDown}
        />
      )}
    </li>
  );
};
