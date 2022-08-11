/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  currentTodo: Todo,
  todos: Todo[],
  onSetTodos: (newValue: Todo[]) => void
  onCheckTodos: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoItem = React.memo<Props>(({
  currentTodo,
  todos,
  onSetTodos,
  onCheckTodos,
}) => {
  const [completed, setCompleted] = useState(currentTodo.completed);
  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState('');

  const textInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    onSetTodos(todos.map(todo => {
      if (currentTodo.id === todo.id) {
        return { ...todo, completed };
      }

      return todo;
    }));

    if (!completed) {
      onCheckTodos(false);
    }
  }, [completed]);

  useEffect(() => {
    setCompleted(currentTodo.completed);
  }, [currentTodo.completed]);

  const [lastKey, setLastKey] = useState('');

  const approveEdit = () => {
    onSetTodos(todos.map(todo => {
      if (todo.id === currentTodo.id && lastKey !== 'Escape') {
        return { ...todo, title };
      }

      return todo;
    })
      .filter(todo => todo.title !== ''));
    setEditing(false);
  };

  const handleEdit = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      setLastKey(key);
      approveEdit();
    }

    if (key === 'Escape') {
      setLastKey(key);
      setEditing(false);
    }
  };

  return (
    <li
      key={currentTodo.id}
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={event => setCompleted(event.target.checked)}
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
            setTitle(currentTodo.title);
          }}
        >
          {currentTodo.title}

        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onSetTodos(todos
            .filter(todo => todo.id !== currentTodo.id))}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        onKeyDown={handleEdit}
        onBlur={approveEdit}
        ref={textInput}
      />
    </li>
  );
});
