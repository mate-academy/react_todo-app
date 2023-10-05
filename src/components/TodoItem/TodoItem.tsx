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
    handleTitleSubmit,
  } = useContext(TodosContext);
  const [editing, setEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && editing) {
      titleField.current.focus();
    }
  }, [editing]);

  const handleTitleEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event?.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      handleTitleSubmit(
        todo.id,
        e.key,
        todoTitle,
        setTodoTitle,
        setEditing,
      );
    }
  };

  const handleBlur = () => {
    if (editing) {
      handleTitleSubmit(
        todo.id,
        'Enter',
        todoTitle,
        setTodoTitle,
        setEditing,
      );
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
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
        onChange={handleTitleEditing}
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={handleBlur}
      />
    </li>
  );
};
