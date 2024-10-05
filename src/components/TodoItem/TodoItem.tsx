import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../type/Todo';
import { TodosContext } from '../TodosContext';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const { todos, setTodos } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDeleteTodo = () => {
    setTodos(todos.filter(filteredTodo => filteredTodo.id !== id));
  };

  const handleToggleTodo = () => {
    setTodos(
      todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleEditTitle = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value.trim()) {
      setTodos(
        todos.map(t =>
          t.id === id ? { ...t, title: event.target.value.trim() } : t,
        ),
      );
    } else {
      handleDeleteTodo();
    }

    setIsEditing(false);
  };

  const handeleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handeleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEditTitle(event as unknown as React.FocusEvent<HTMLInputElement>);
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggleTodo}
        />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          className="todoapp__new-todo"
          value={newTitle}
          onChange={handeleTitleChange}
          onBlur={handleEditTitle}
          onKeyUp={handeleKeyUp}
          style={{
            outline: 'none',
            boxSizing: 'border-box',
            paddingLeft: '16px',
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEditing(true);
              setIsEditing(true);
            }}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
