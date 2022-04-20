import classnames from 'classnames';
import React, { useState } from 'react';

type TodoAction = (todiId: number) => void;

interface Props extends Todo {
  toggleTodo: TodoAction,
  removeTodo: TodoAction,
  changeTodoTitle: (newTitle: string, todoId: number) => void,
}

export const Todo: React.FC<Props> = ({
  title,
  completed,
  id,
  toggleTodo,
  removeTodo,
  changeTodoTitle,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSaveTitle = () => {
    const formattedTitle = newTitle.replaceAll(' ', '');

    if (formattedTitle === '') {
      setNewTitle(title);
    } else {
      changeTodoTitle(newTitle, id);
    }

    setEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        handleSaveTitle();
        break;
      case 'Escape':
        setNewTitle(title);
        setEditing(false);
        break;
      default:
        break;
    }
  };

  return (
    <li
      className={classnames(
        { completed },
        { editing },
      )}
    >
      <div className={classnames(
        { view: !completed },
        { completed },
      )}
      >
        <input
          type="checkbox"
          id={`todo-${id}`}
          className="toggle"
          onChange={() => {
            toggleTodo(id);
          }}
          checked={completed}
        />
        <label
          htmlFor="none"
          onDoubleClick={() => {
            if (completed) {
              return;
            }

            setEditing(true);
          }}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            removeTodo(id);
          }}
        >
          {' '}
        </button>
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        onBlur={() => {
          handleSaveTitle();
        }}
        onKeyUp={handleKeyPress}
      />
    </li>
  );
};
