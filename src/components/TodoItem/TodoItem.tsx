import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import './TodoItem.scss';

type Props = {
  todo: Todo,
  deleteTodo: (todoId: number) => void,
  changeStatus: (todoId: number) => void,
  changeTitle: (todoId: number, newTitle: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  changeStatus,
  changeTitle,
}) => {
  const [editTodo, setEditTodo] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const makeChanges = () => {
    if (newTitle.length === 0) {
      deleteTodo(todo.id);
      setEditTodo(false);
    } else {
      changeTitle(todo.id, newTitle);
      setEditTodo(false);
    }
  };

  return (
    <li
      className={classNames(
        `TodoItem + ${todo.completed
          ? 'TodoItem--completed'
          : ''
        }`,
      )}
      onDoubleClick={
        () => setEditTodo(true)
      }
    >
      <input
        type="checkbox"
        className="TodoItem__toggle"
        id="toggle-view"
        onChange={() => {
          changeStatus(todo.id);
        }}
      />
      <label
        htmlFor="toggle-view"
        className={classNames(
          `TodoItem__label + ${todo.completed
            ? 'TodoItem__label--completed'
            : ''
          }`,
        )}
      >
        {todo.title}
      </label>
      <button
        type="button"
        className="TodoItem__destroy"
        data-cy="deleteTodo"
        onClick={
          () => deleteTodo(todo.id)
        }
      />
      <input
        type="text"
        className={editTodo
          ? 'TodoItem__edit--active input'
          : 'TodoItem__edit input'}
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        onBlur={() => {
          makeChanges();
        }}
        onKeyDown={(event) => {
          const { key } = event.nativeEvent;

          if (key === 'Enter') {
            makeChanges();
          } else if (key === 'Escape') {
            setNewTitle(todo.title);
            setEditTodo(false);
          }
        }}
      />
    </li>
  );
};
