import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useTodos } from '../utils/TodoContext';

type Props = {
  item: Todo
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { deleteTodo, updateTodo } = useTodos();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isEdited, setIsEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  useEffect(() => {
    if (isEdited && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdited]);

  const handleChangeStatus = () => {
    const updatedTodo = { ...item, completed: !item.completed };

    updateTodo(updatedTodo);
  };

  const doubleClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsEdited(true);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'Escape') {
      setIsEdited(false);
      setNewTitle(item.title);
    }
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTodo = { ...item, title: newTitle };

    if (!newTitle) {
      deleteTodo(item.id);
    } else if (newTitle === item.title) {
      setIsEdited(false);
    } else {
      updateTodo(updatedTodo);
      setIsEdited(false);
    }
  };

  return (
    <li
      className={classNames({
        completed: item.completed,
        editing: isEdited,
      })}
      onDoubleClick={doubleClickHandler}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          id="toggle-view"
          onChange={handleChangeStatus}
        />

        {isEdited ? (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              className="edit"
              placeholder="Empty todo will be deleted"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              onBlur={handleUpdate}
              onKeyUp={(event) => handleKeyUp(event)}
              ref={inputRef}
            />
          </form>
        ) : (
          <>
            <label
              onDoubleClick={doubleClickHandler}
            >
              {item.title}
            </label>
            <button
              type="button"
              aria-label="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => deleteTodo(item.id)}
            />
          </>
        )}

      </div>
    </li>
  );
};
