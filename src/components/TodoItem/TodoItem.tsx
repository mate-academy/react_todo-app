import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../type/Todo';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, setChoseEditItem } = useContext(TodosContext);

  const { id, title, completed } = todo;

  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState(title);

  const editFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsChecked(completed);
  }, [completed]);

  useEffect(() => {
    if (editFieldRef.current) {
      editFieldRef.current?.focus();
    }
  }, [isEdit]);

  function newValue<T>(key: string, value: T) {
    return todos.map(item => {
      return item.id === id ? { ...item, [key]: value } : item;
    });
  }

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setTodos(newValue('completed', event.target.checked));
  };

  const handleEditItem = () => {
    setIsEdit(true);
    setChoseEditItem(id);
  };

  const removeTodo = () => {
    setTodos(
      todos.filter(item => {
        return item.id !== id;
      }),
    );
    setChoseEditItem(null);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newQuery = query.trim();

    if (!newQuery) {
      return removeTodo();
    }

    setIsEdit(false);
    setChoseEditItem(null);

    if (newQuery === title) {
      if (newQuery !== query) {
        setQuery(newQuery);
      }

      return;
    }

    setTodos(newValue('title', newQuery));
  };

  const cancelEditing = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.key === 'Escape') {
      setQuery(title);
      setIsEdit(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: isChecked })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isChecked}
          onChange={handleChecked}
        />
      </label>

      {!isEdit ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleEditItem}
          >
            {title}
          </span>
          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={removeTodo}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={onSubmit} onBlur={onSubmit} onKeyUp={cancelEditing}>
          <input
            ref={editFieldRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      )}
    </div>
  );
};
