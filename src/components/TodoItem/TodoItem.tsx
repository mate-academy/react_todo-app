import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const titleField = useRef<HTMLInputElement>(null);

  const handleTodoComplete = (id: number) => {
    dispatch({ type: 'toggle', payload: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: 'delete', payload: id });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setIsOnFocus(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsOnFocus(false);
    if (!newTitle.trim()) {
      dispatch({ type: 'delete', payload: todo.id });

      return;
    }

    dispatch({ type: 'edit', payload: { id: todo.id, newTitle } });
  };

  const handleNewTitleSubmit = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Escape') {
      setIsEditing(false);
      setIsOnFocus(false);
      setNewTitle(todo.title);
    }

    if (ev.key === 'Enter') {
      handleBlur();
    }
  };

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isOnFocus]);

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-completed"
          checked={todo.completed}
          onChange={() => handleTodoComplete(todo.id)}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={titleField}
        value={newTitle}
        onChange={(ev) => setNewTitle(ev.target.value)}
        onKeyDown={handleNewTitleSubmit}
        onBlur={handleBlur}
      />
    </li>
  );
};
