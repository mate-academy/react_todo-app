/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  toggleComplete: (todoId: number) => void,
  onDeleteTodo: (selectTodo: Todo) => void,
  updateTodo: (todoId: number, title: string) => void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleComplete,
  onDeleteTodo,
  updateTodo,
}) => {
  const [isEdit, setEdit] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const onEditTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEdit(false);
      setTodoTitle(event.target.value);
      updateTodo(todo.id, todoTitle);

      if (!event.target.value) {
        onDeleteTodo(todo);
      }
    }

    if (event.key === 'Escape') {
      setEdit(false);
      setTodoTitle(todo.title);
    }
  };

  const onEditBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!event.target.value.trim().length) {
      onDeleteTodo(todo);
    } else {
      setEdit(false);
      setTodoTitle(event.target.value);
      updateTodo(todo.id, todoTitle);
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEdit && !todo.completed,
      })}
      key={todo.id}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={() => toggleComplete(todo.id)}
          checked={todo.completed}
        />
        <label onDoubleClick={() => {
          setEdit(true);
        }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            onDeleteTodo(todo);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.target.value)}
        onKeyDown={onEditTodo}
        onBlur={onEditBlur}
      />
    </li>
  );
};
