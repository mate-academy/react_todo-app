/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../Types/Todo';

interface Props {
  currentTodo: Todo,
  todos: Todo[],
  onSetTodos: (newValue: Todo[]) => void
  onCheckTodos: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoItem = React.memo<Props>(({
  currentTodo, todos, onSetTodos, onCheckTodos,
}) => {
  const [isCompleted, setCompleted] = useState(currentTodo.completed);
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const textInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    onSetTodos(todos.map(todo => {
      if (currentTodo.id === todo.id) {
        return { ...todo, completed: isCompleted };
      }

      return todo;
    }));

    if (!isCompleted) {
      onCheckTodos(false);
    }
  }, [isCompleted]);

  useEffect(() => {
    setCompleted(currentTodo.completed);
  }, [currentTodo.completed]);

  const approveEdit = () => {
    setEditing(false);
    onSetTodos(todos.map(todo => {
      if (todo.id === currentTodo.id) {
        return { ...todo, title: newTitle };
      }

      return todo;
    })
      .filter(todo => todo.title !== ''));
  };

  const handleEdit = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      approveEdit();
    }

    if (key === 'Escape') {
      setEditing(false);
      setNewTitle('');
    }
  };

  return (
    <li
      key={currentTodo.id}
      className={classNames({
        completed: isCompleted,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={isCompleted}
          onChange={event => setCompleted(event.target.checked)}
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
            setNewTitle(currentTodo.title);
          }}
        >
          {currentTodo.title}

        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => (
            onSetTodos(todos.filter(todo => todo.id !== currentTodo.id))
          )}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
        onKeyDown={handleEdit}
        onBlur={approveEdit}
        ref={textInput}
      />
    </li>
  );
});
