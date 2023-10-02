import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const { switchTodo, deleteTodo, changeTodoTitle } = useContext(TodosContext);

  const [isEditing, setIsEditing] = useState(false);
  const [changedTitle, setChangedTitle] = useState(title);

  const input = useRef<HTMLInputElement | null>(null);

  const updateTodoTitle = () => {
    const trimmedTitle = changedTitle.trim();

    if (trimmedTitle) {
      setChangedTitle(trimmedTitle);
      setIsEditing(false);
      changeTodoTitle(id, trimmedTitle);
    } else {
      deleteTodo(id);
    }
  };

  const handleSwitchTodo = () => {
    switchTodo(id);
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setChangedTitle(title);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedTitle(e.target.value);
  };

  const handlekeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateTodoTitle();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  useEffect(() => {
    if (!isEditing && input.current) {
      input.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={classNames({
      completed,
      editing: isEditing,
    })}
    >
      {!isEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${id}`}
            checked={completed}
            onChange={handleSwitchTodo}
          />
          <label onDoubleClick={handleEditing}>
            {title}
          </label>
          {/* eslint-disable-next-line */}
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={handleDeleteTodo}
          />
        </div>
      )
        : (
          <input
            type="text"
            className="edit"
            value={changedTitle}
            onChange={handleChangeTitle}
            onKeyUp={handlekeyUp}
            onBlur={updateTodoTitle}
          />
        )}
    </li>
  );
};
