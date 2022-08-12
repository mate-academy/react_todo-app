/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../Types/Todo';

type Props = {
  todo: Todo,
  deleteTodo: (todoId: number) => void,
  toggleCompleted: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  toggleCompleted,
}) => {
  const [editor, setEditor] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const editorTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!event.target.value.trim()) {
        deleteTodo(todo.id);
      }

      setEditor(false);
      setTitle(event.target.value);
    }

    if (event.key === 'Escape') {
      setEditor(false);
      setTitle(event.target.value);
    }
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: editor && !todo.completed,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => toggleCompleted(todo.id)}
        />
        <label
          onDoubleClick={() => setEditor(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onKeyDown={editorTodo}
      />
    </li>
  );
};
