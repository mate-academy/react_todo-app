/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

type Props = {
  title: string,
  completed: boolean,
  todoId: number,
  handlerChecked: (todoId: number) => void,
  handlerDeleteTodo: (todoId: number) => void,
  handlerEditTodo: (title: string, todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  title,
  completed,
  todoId,
  handlerChecked,
  handlerDeleteTodo,
  handlerEditTodo,
}) => {
  const [editor, setEditor] = useState(false);
  const [etidorTitle, setEtidorTitle] = useState('');

  useEffect(() => {
    setEtidorTitle(title);
  }, []);

  const controlKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handlerEditTodo(etidorTitle, todoId);
      setEditor(false);
    } else if (event.key === 'Escape') {
      setEditor(false);
    }
  };

  return (
    <li
      className={classnames({
        completed,
        editing: editor,
      })}
      onDoubleClick={() => setEditor(!editor)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => handlerChecked(todoId)}
        />
        <label>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => handlerDeleteTodo(todoId)}
        >
          {' '}
        </button>
      </div>
      <input
        type="text"
        className="edit"
        value={etidorTitle}
        onChange={(event) => setEtidorTitle(event.target.value)}
        onKeyDown={controlKeyDown}
      />
    </li>
  );
};
