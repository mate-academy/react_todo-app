/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/todo';

type Props = {
  todo: Todo,
  onDelete: (todoID: number) => void
  onUpdate: (updatedTodo: Todo) => void
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const doubleClick = (param: number) => {
    if (param === 2) {
      setIsEdit(true);
    }
  };

  const creatNewTodo = (value: string | boolean) => {
    const newTodo = {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    };

    if (typeof value === 'boolean') {
      newTodo.completed = value;
    } else {
      newTodo.title = value;
    }

    return newTodo;
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: isEdit,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            const checked = !todo.completed;

            onUpdate(creatNewTodo(checked));
          }}
        />
        <label
          role="presentation"
          onClick={(event) => doubleClick(event.detail)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.target.value)}
        onKeyUp={event => {
          if (event.key === 'Enter') {
            if (todoTitle.length > 0) {
              onUpdate(creatNewTodo(todoTitle));
              setIsEdit(false);
            } else {
              onDelete(todo.id);
              setIsEdit(false);
            }
          }

          if (event.key === 'Escape') {
            setTodoTitle(todo.title);
            setIsEdit(false);
          }
        }}
        onBlur={() => {
          onUpdate(creatNewTodo(todoTitle));
          setIsEdit(false);
        }}
      />
    </li>
  );
};
