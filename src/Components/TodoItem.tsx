/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../Types/Todo';
import classNames from 'classnames';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { todos, setTodos } = useContext(TodosContext);

  const [isChecked, setIsChecked] = useState(completed);
  const [isEdited, setIsEdited] = useState(false);
  const [titleValue, setTitleValue] = useState(title);

  const formField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formField.current && isEdited) {
      formField.current.focus();
    }
  }, [isEdited]);

  const handleDeleteTodo = () => {
    const changedTodos = [...todos].filter(t => t.id !== id);

    setTodos(changedTodos);
  };

  const handleChangeCompleted = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const changedTodos = [...todos].map(t => {
      if (t.id === id) {
        return {
          ...t,
          completed: event.target.checked,
        };
      }

      return t;
    });

    setTodos(changedTodos);
    setIsChecked(event.target.checked);
  };

  const handleChangeTitle = () => {
    if (!titleValue.trim().length) {
      handleDeleteTodo();
    } else {
      const changedTodos = [...todos].map(t => {
        if (t.id === id) {
          return {
            ...t,
            title: titleValue.trim(),
          };
        }

        return t;
      });

      setTitleValue(titleValue.trim());
      setTodos(changedTodos);
      setIsEdited(false);
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleChangeTitle();
  };

  const handleResetForm = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      setTitleValue(title);
      setIsEdited(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isChecked}
          onChange={handleChangeCompleted}
        />
      </label>

      {isEdited ? (
        <form onSubmit={handleSubmitForm} onKeyUp={handleResetForm}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={formField}
            value={titleValue}
            onChange={event => setTitleValue(event.target.value)}
            onBlur={handleChangeTitle}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdited(true)}
          >
            {titleValue}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
