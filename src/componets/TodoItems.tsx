/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Todos } from '../type/Todos';

type Props = {
  todo: Todos
  changeComplated: (todoId: number) => void
  deletedTodo: (todoId: number) => void
  changeTitle: (title: string, todoId: number) => void
};

export const TodoItems: React.FC<Props> = ({
  todo, changeComplated, deletedTodo, changeTitle,
}) => {
  const { id, complated, title } = todo;

  const [isEding, setIsEding] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEding) {
      inputRef.current?.focus();
    }
  }, [isEding]);

  const handleDuvleClick = () => {
    setIsEding(true);
  };

  const isBlurInput = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTitle !== title) {
      changeTitle(newTitle, id);
      setIsEding(false);
    }

    if (!newTitle.trim()) {
      deletedTodo(id);
    }

    setIsEding(false);
  };

  const handleChange = (event: { target: { value: string } }) => {
    setNewTitle(event.target.value);
  };

  const keyUp = (event: { key: string }) => {
    switch (event.key) {
      case 'Enter':
        changeTitle(newTitle, id);
        break;

      case 'Escape':
        setNewTitle(title);
        setIsEding(false);
        break;

      default: break;
    }
  };

  return (
    <li
      className={classNames(
        {
          completed: complated,
          editing: isEding,
        },
      )}
      key={id}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-completed"
          checked={complated}
          onChange={() => changeComplated(id)}
        />
        <label
          onDoubleClick={handleDuvleClick}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deletedTodo(id)}
        />
      </div>
      <form onSubmit={isBlurInput}>
        <input
          ref={inputRef}
          type="text"
          className="edit"
          value={newTitle}
          onKeyUp={keyUp}
          onChange={handleChange}
          onBlur={isBlurInput}
        />

      </form>

    </li>
  );
};
