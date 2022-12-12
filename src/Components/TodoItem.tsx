/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, memo, useCallback } from 'react';
import classNames from 'classnames';
import { Todo } from '../Types/Todo';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = memo(({ todo, todos, setTodos }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleMarkAsCompleted = useCallback(() => {
    setTodos(todos.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        return {
          ...currentTodo,
          completed: !currentTodo.completed,
        };
      }

      return currentTodo;
    }));
  }, [todos]);

  const handleRemove = useCallback(() => {
    setTodos(todos.filter(currentTodo => currentTodo.id !== todo.id));
  }, [todos]);

  const handleDoubleClick = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  const handleEdit = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  }, [newTitle]);

  const createNewTitle = useCallback((
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      setTodos(todos.map(currentTodo => {
        if (currentTodo.id === todo.id) {
          return {
            ...currentTodo,
            title: newTitle,
          };
        }

        return currentTodo;
      }));
      setEditMode(false);
    }

    if (e.key === 'Escape') {
      setNewTitle(todo.title);
      setEditMode(false);
    }
  }, [todos, editMode, newTitle]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editMode,
      })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle"
          onChange={handleMarkAsCompleted}
          checked={todo.completed}
        />
        <label>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemove}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={e => handleEdit(e)}
        onKeyDown={e => createNewTitle(e)}
      />
    </li>
  );
});
