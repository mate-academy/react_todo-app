/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../../store/TodoProvider';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [titleValue, setTitleValue] = useState(todo.title);
  const [showEditForm, setShowEditForm] = useState(false);
  const { id, title, completed } = todo;
  const { todos, setTodos } = useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showEditForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showEditForm]);

  const handleDelete = () => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleUpdate = (newTodo: Todo) => {
    const newTodos = [...todos];

    newTodos[todos.findIndex(t => t.id === id)] = newTodo;

    setTodos(newTodos);
  };

  const handleEdit = () => {
    const cleanTitle = titleValue.trim();

    if (cleanTitle === title) {
      setShowEditForm(false);

      return;
    }

    if (!cleanTitle) {
      handleDelete();

      setShowEditForm(false);

      return;
    }

    const newTodo = todo;

    newTodo.title = cleanTitle;
    handleUpdate(newTodo);
    setShowEditForm(false);
  };

  const handleToggleActive = () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    handleUpdate(updatedTodo);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleEdit();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitleValue(title);
      setShowEditForm(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed })}
      onDoubleClick={() => setShowEditForm(true)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggleActive}
        />
      </label>

      {showEditForm ? (
        <form onSubmit={handleFormSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={titleValue}
            onChange={event => setTitleValue(event.target.value)}
            onBlur={handleEdit}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
