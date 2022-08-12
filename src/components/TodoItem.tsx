/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  updateTodo: (updatedTodo: Todo) => void,
  deleteTodo: (value: number | boolean) => void
};

export const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

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
    <li className={
      classNames({ completed: todo.completed, editing: isEditing })
    }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            updateTodo(creatNewTodo(!todo.completed));
          }}
        />
        <label
          role="presentation"
          onDoubleClick={() => setIsEditing(true)}
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
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.target.value)}
        onKeyUp={event => {
          if (event.key === 'Enter') {
            if (todoTitle.length > 0) {
              updateTodo(creatNewTodo(todoTitle));
              setIsEditing(false);
            } else {
              deleteTodo(todo.id);
              setIsEditing(false);
            }
          }

          if (event.key === 'Escape') {
            setTodoTitle(todo.title);
            setIsEditing(false);
          }
        }}
        onBlur={() => {
          updateTodo(creatNewTodo(todoTitle));
          setIsEditing(false);
        }}
      />
    </li>
  );
};
