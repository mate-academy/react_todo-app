import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    handleCheckboxClick,
    handleDelete,
    handleTitleEditing,
    handleKeyDown,
    handleBlur,
  } = useContext(TodosContext);
  const [editing, setEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && editing) {
      titleField.current.focus();
    }
  }, [editing]);

  return (
    <li
      className={cn({
        completed: todo.completed === true,
        editing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={() => handleCheckboxClick(todo.id)}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </label>
        <button
          aria-label="button"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={titleField}
        value={todoTitle}
        onChange={(e) => handleTitleEditing(setTodoTitle, e.target.value)}
        onKeyDown={(e) => handleKeyDown(
          todo.id,
          e.key,
          todoTitle,
          setTodoTitle,
          setEditing,
        )}
        onBlur={() => handleBlur(
          todo.id, editing, todoTitle, setTodoTitle, setEditing,
        )}
      />
    </li>
  );
};
