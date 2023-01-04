import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';
import { TodoTitleField } from './TodoTitleField';

type Props = {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
  activeTodoID: number[];
  changeTodo: (todo: Todo, title: string, completed: boolean) => Promise<void>;
  isAdding: boolean;
  showError: (message: Errors) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  activeTodoID,
  changeTodo,
  isAdding,
  showError,
}) => {
  const { id, title, completed } = todo;
  const [checked, setChecked] = useState(false);
  const [edited, setEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const todoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [edited]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (todoField.current) {
      if (!newTitle.trim()) {
        try {
          await onDelete(id);
        } catch (e) {
          showError(Errors.DELETE);
        }
      } else if (newTitle === title) {
        setEdited(false);
        setNewTitle(title);
      } else {
        try {
          await changeTodo(todo, newTitle, false);
          await setNewTitle(newTitle);
          await setEdited(false);
        } catch (e) {
          showError(Errors.UPDATE);
        }
      }
    }
  };

  const handleCancelEdit = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEdited(false);
      setNewTitle(title);
    }
  };

  const handleChangeTodoStatus
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    try {
      changeTodo(todo, title, !completed);
    } catch (e) {
      showError(Errors.UPDATE);
    }
  };

  const handleChangeTodoTitle = () => {
    setEdited(true);
  };

  return (
    <li
      data-cy="Todo"
      className={classNames('todo', { completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={checked}
          onChange={handleChangeTodoStatus}
        />
      </label>

      {!edited
        ? (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={handleChangeTodoTitle}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="deleteTodo"
              onClick={() => onDelete(id)}
            >
              ×
            </button>
          </>

        )
        : (
          <TodoTitleField
            newTodoField={todoField}
            className="todo__title-field"
            isAdding={isAdding}
            value={newTitle}
            setValue={setNewTitle}
            handleSubmit={handleSubmit}
            onBlur={event => handleSubmit(event)}
            onKeyDown={event => handleCancelEdit(event)}
          />
        )}

      <div
        data-cy="TodoLoader"
        className={
          classNames('modal overlay',
            { 'is-active': activeTodoID.includes(id) })
        }
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
