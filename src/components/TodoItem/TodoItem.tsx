/* eslint-disable */
import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [editing, setEditing] = useState(false);

  const {
    deleteTodo,
    updateTodo,
  } = useContext(TodosContext);

  const deleteTodoHandler = () => {
    deleteTodo(todo.id);
  };

  const toggleTodoHandler = () => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  const cancelEditing = () => {
    setEditing(false);
    setTitle(todo.title);
  };

  const onKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key === 'Escape') {
      cancelEditing();
    }

    if (event.key === 'Enter') {
      if (!title.trim()) {
        deleteTodo(todo.id);
        setEditing(false);

        return;
      }

      updateTodo({ ...todo, title });
      setEditing(false);
    }
  };

  const onBlurHandler = () => {
    updateTodo({ ...todo, title });

    setEditing(false);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing,
      })}
    >
      {editing ? (
        <input
          type="text"
          className="edit"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyUp={onKeyUpHandler}
          onBlur={onBlurHandler}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={toggleTodoHandler}
          />

          <label
            onDoubleClick={() => setEditing(true)}
          >
            {todo.title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={deleteTodoHandler}
          />
        </div>
      )}
    </li>
  );
};
