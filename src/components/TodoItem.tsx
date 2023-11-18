import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/todo';
import { TodosContext } from '../contexts/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDoubleClick = () => {
    setIsEditing(true);
    setNewTitle(todo.title);
  };

  const handleBlur = () => {
    if (isEditing) {
      dispatch({ type: 'edit', todoId: todo.id, newTitle: newTitle.trim() });
    }

    setIsEditing(false);
  };

  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      dispatch({ type: 'edit', todoId: todo.id, newTitle: newTitle.trim() });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  });

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => {
            dispatch({ type: 'complete', todoId: todo.id });
          }}
        />
        <label
          onDoubleClick={() => handleDoubleClick()}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => {
            dispatch({ type: 'delete', todoId: todo.id });
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={inputRef}
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
        onKeyUp={handlerKeyUp}
        onBlur={handleBlur}
      />
    </li>
  );
};
