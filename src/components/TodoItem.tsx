/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (todoId: number) => void,
  updateTodoData: (todoId: number, data: object) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  updateTodoData,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  });

  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChangeStatus = () => {
    updateTodoData(todo.id, { completed: !todo.completed });
  };

  const renameTodo = () => {
    setIsEditingTodo(false);

    if (newTitle.trim() === todo.title) {
      return;
    }

    if (!newTitle.trim()) {
      deleteTodo(todo.id);

      return;
    }

    updateTodoData(todo.id, { title: newTitle });
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditingTodo(false);
      setNewTitle(todo.title);
    }

    if (event.key === 'Enter') {
      renameTodo();
    }
  };

  const handleBlur = () => {
    renameTodo();
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditingTodo,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleChangeStatus}
        />
        <label onDoubleClick={() => setIsEditingTodo(true)}>
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
        placeholder="Empty todo will be deleted"
        ref={newTodoField}
        value={newTitle}
        onChange={handleChangeTitle}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
