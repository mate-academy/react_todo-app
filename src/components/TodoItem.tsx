/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/todo';

type Props = {
  todo: Todo
  todos: Todo[]
  deleteTodo: (id: string) => void
  toggleTodoStatus: (id: string) => void
};

export const TodoItem: React.FC<Props> = ({
  todos,
  todo,
  deleteTodo,
  toggleTodoStatus,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const updateTitel = (e: React.KeyboardEvent | string) => {
    if (e === 'Enter') {
      setIsEditing(false);

      const updatedTodos = todos.map(prevTodo => (prevTodo.id === todo.id
        ? { ...todo, title: updatedTitle }
        : prevTodo));

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  return (
    <li
      key={todo.id}
      className={
        classNames('todo', { completed: todo.completed })
      }
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          onChange={() => toggleTodoStatus(todo.id)}
        />
        <label onClick={() => setIsEditing(true)}>
          {isEditing
            ? (
              <input
                className="todo"
                value={updatedTitle}
                onChange={(e) => (setUpdatedTitle(e.target.value))}
                onKeyDown={(e) => updateTitel(e.key)}
                onBlur={() => updateTitel('Enter')}
              />
            )
            : <div className="todo">{updatedTitle}</div>}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
