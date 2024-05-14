import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { TodoMethod } from '../../context/ToDosContext';
import { TodoType } from '../../types/types';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const methods = useContext(TodoMethod);
  const [changer, setChanger] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const fieldRef = useRef<HTMLInputElement>(null);

  const saveChange = () => {
    const trimmed = title.trim();

    if (trimmed) {
      methods.renameTodo(todo.id, trimmed);
    } else {
      methods.deleteTodo(todo.id);
    }

    setChanger(false);
  };

  useEffect(() => {
    if (changer) {
      setTitle(todo.title);
      fieldRef.current?.focus();
    }
  }, [changer, todo.title]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveChange();
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => methods.toggleTodo(todo.id)}
        />
      </label>

      {changer ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            ref={fieldRef}
            className="todoapp__new-todo todoapp__new-todo--field"
            placeholder="What needs to be done?"
            defaultValue={todo.title}
            onBlur={saveChange}
            onChange={e => setTitle(e.target.value)}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setChanger(false);
              }
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setChanger(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => methods.deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
