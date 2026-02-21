import classNames from 'classnames';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { TodoContext } from '../../store/TodoContext';
import {
  completeTodoAction,
  deleteTodoAction,
  renameTodoAction,
} from '../../store/TodoReducer';
import { TodoType } from '../../types/TodoType';

type Props = {
  todo: TodoType;
};

export const TodoItem = ({ todo }: Props) => {
  const { dispatch } = useContext(TodoContext);
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(todo.title);
  }, [todo.title]);

  const cancelEditings = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setIsEditing(false);
    }
  };

  const editTodo = () => {
    const trimmed = title.trim();

    if (!trimmed) {
      dispatch(deleteTodoAction(todo.id));
    } else {
      dispatch(renameTodoAction(todo.id, trimmed));
    }

    setIsEditing(false);
  };

  const saveTodoOnEnter = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    editTodo();
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed ? true : false}
          onChange={() => dispatch(completeTodoAction(todo.id))}
        />
      </label>

      {isEditing === false ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch(deleteTodoAction(todo.id))}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={saveTodoOnEnter}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onKeyUp={event => cancelEditings(event)}
            onBlur={() => editTodo()}
          />
        </form>
      )}
    </div>
  );
};
