import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const [newTitle, setNewTitle] = useState(todo.title);
  const { dispatch } = useContext(TodoContext);
  const [isEditable, setIsEditable] = useState(false);

  const trimmedTitle = newTitle.trim();

  const deleteTodo = () => dispatch({ type: 'deleteTodo', payload: id });
  const toggleTodo = () => dispatch({ type: 'toggleTodo', payload: id });
  const updateTodoTitle = () => dispatch({
    type: 'updateTodoTitle', payloadId: id, payloadTitle: trimmedTitle,
  });

  const handleEdit = (
    value: string,
  ) => {
    if (value) {
      updateTodoTitle();
      setIsEditable(false);
    } else {
      deleteTodo();
      setIsEditable(false);
    }
  };

  const handleKeyUpEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      handleEdit(e.target.value);
    }

    if (e.key === 'Escape') {
      setIsEditable(false);
    }
  };

  const editRef = useRef<HTMLInputElement>(null);
  let editTimerId = 0;

  useEffect(() => {
    if (isEditable) {
      editTimerId = window.setTimeout(() => {
        editRef.current?.focus();
      }, 0);
    }

    return () => {
      window.clearTimeout(editTimerId);
    };
  }, [isEditable]);

  return (
    <li
      className={classNames({
        completed,
        editing: isEditable,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={toggleTodo}
        />
        <label
          onDoubleClick={() => setIsEditable(true)}
        >
          {title}
        </label>

        <button
          type="button"
          aria-label="Delete button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editRef}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyUp={handleKeyUpEdit}
        onBlur={(e) => handleEdit(e.target.value)}
      />
    </li>
  );
};
