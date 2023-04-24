import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, titleOrCompleted: string | boolean) => void;
  setErrorText: (text: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo, removeTodo, updateTodo,
}) => {
  const { id, title, completed } = todo;
  const [todoTitle, setTodoTitle] = useState(title);
  const [prevTitle, setPrevTitle] = useState(title);
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsUpdating(true);
    setPrevTitle(title);
  };

  const handleComplete = () => updateTodo(id, !completed);

  const handleRemoval = () => removeTodo(id);

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleBlur = () => {
    if (todoTitle.length === 0) {
      removeTodo(id);
    } else {
      updateTodo(id, todoTitle);
    }

    setIsUpdating(false);
  };

  const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTodoTitle(prevTitle);
      setIsUpdating(false);
    }

    if (event.key === 'Enter') {
      if (todoTitle.length === 0) {
        removeTodo(id);
      } else {
        updateTodo(id, todoTitle);
      }

      setIsUpdating(false);
    }
  };

  return (
    <li
      key={id}
      className={
        classNames('todo',
          { completed })
      }
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onClick={handleComplete}
        />
      </label>

      {!isUpdating ? (
        <span
          className="todo__title"
          onDoubleClick={handleFocus}
          onBlur={handleBlur}
        >
          {todoTitle}
        </span>
      ) : (
        <input
          className="todo__title todo__title-input"
          value={todoTitle}
          onChange={handleEdit}
          onBlur={handleBlur}
          onKeyUp={handleInput}
          ref={inputRef}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      )}

      <button
        type="button"
        className="todo__remove"
        onClick={handleRemoval}
      >
        ×
      </button>
    </li>
  );
};
