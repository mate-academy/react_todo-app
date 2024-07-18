import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo as TodoType } from '../types/Todo';
import { deleteTodo, updateTodo } from '../api/todos';
import { useTodos } from '../context/useTodos';
import { ActionTypes } from '../types/ActionTypes';

type Props = {
  todo: TodoType;
  fieldTitle: React.RefObject<HTMLInputElement>;
};

export const Todo: React.FC<Props> = ({ todo, fieldTitle }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const fieldTitleForm = useRef<HTMLInputElement>(null);
  const { dispatch } = useTodos();

  useEffect(() => {
    fieldTitleForm.current?.focus();
  }, [isEdit]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsEdit(false);
        setNewTitle(todo.title);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [[]]);

  const onDelete = (task: TodoType) => {
    dispatch({ type: ActionTypes.onDelete, payload: task });
    deleteTodo(task.id);
    fieldTitle.current?.focus();
  };

  const onSubmit = () => {
    const title = newTitle.trim();

    if (title === todo.title) {
      setIsEdit(false);

      return;
    }

    if (!title) {
      onDelete(todo);

      return;
    }

    const updatedTodo = {
      ...todo,
      title: title,
    };

    dispatch({ type: ActionTypes.onUpdate, payload: updatedTodo });
    updateTodo(updatedTodo);
    setIsEdit(false);
    fieldTitleForm.current?.focus();
  };

  const handleOnChange = () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    dispatch({ type: ActionTypes.onUpdate, payload: updatedTodo });
    updateTodo(updatedTodo);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        {' '}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleOnChange}
        />
      </label>

      {!isEdit ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdit(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo)}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleOnSubmit}>
          <input
            ref={fieldTitleForm}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={() => onSubmit()}
          />
        </form>
      )}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
