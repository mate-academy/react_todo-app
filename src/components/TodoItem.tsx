/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { changeTodo, deleteTodo } from '../api/localStorageFunctions';
import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import { FocusContext } from '../context/FocusContext';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo: { title, id, completed } }: Props) => {
  const { setTodos } = useContext(TodosContext);
  const { focusInput } = useContext(FocusContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const handleChanges = (param: 'status' | 'title') => {
    let changes = {};

    if (param === 'status') {
      changes = { completed: !completed };
    }

    if (param == 'title') {
      changes = { title: newTitle.trim() };
    }

    changeTodo(id, changes);
    setTodos(prevTodos =>
      prevTodos.map(prevTodo => {
        if (prevTodo.id !== id) {
          return prevTodo;
        }

        return {
          ...prevTodo,
          ...changes,
        };
      }),
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(id);
    setTodos(prevTodos => prevTodos.filter(prevTodo => prevTodo.id !== id));
    setIsEditing(false);
    focusInput();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTitle.trim() === title) {
      setIsEditing(false);

      return;
    }

    if (!newTitle.trim()) {
      handleDelete();
    } else {
      handleChanges('title');
    }
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleChanges('status')}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit} onBlur={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={handleEscape}
            autoFocus
          />
        </form>
      ) : (
        <>
          {' '}
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>{' '}
        </>
      )}
    </div>
  );
};
