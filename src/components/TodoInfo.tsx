import classNames from 'classnames';
import { Todo } from '../types/Todo';

import { useEffect, useRef, useState } from 'react';

import { useTodos } from '../hooks/useTodos';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, id, userId } = todo;
  const { setTodos, setIsFocusing } = useTodos();
  const [focused, setFocused] = useState(false);
  const [valueTitle, setValueTitle] = useState(title);

  const field = useRef<HTMLInputElement>(null);

  const isEscPressed = useRef(false);

  useEffect(() => {
    setValueTitle(title);
  }, [title]);

  const handleClick = () => {
    setFocused(true);
  };

  useEffect(() => {
    field.current?.focus();
  }, [focused]);

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      isEscPressed.current = true;
      setValueTitle(title);
      document.removeEventListener('keyup', handleEsc);
      field.current?.blur();
    }
  };

  const handleFocus = () => {
    document.addEventListener('keyup', handleEsc);
  };

  const handleDelete = () => {
    setTodos(prev => {
      const newList = [...prev].filter(todoItem => todoItem.id !== id);

      return newList;
    });
    setIsFocusing(prev => !prev);
  };

  const handleBlur = () => {
    setFocused(false);
    if (isEscPressed.current) {
      isEscPressed.current = false;
      document.removeEventListener('keyup', handleEsc);

      return;
    }

    if (valueTitle === '') {
      handleDelete();

      return;
    }

    if (valueTitle.trim() !== title) {
      const newTodo: Todo = {
        id: id,
        userId: userId,
        title: valueTitle.trim(),
        completed: completed,
      };

      setTodos(prev => {
        const newList = prev.map(todoItem =>
          todoItem.id === id ? newTodo : todoItem,
        );

        return newList;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleBlur();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitle(event.target.value);
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(prevTodos =>
      prevTodos.map(todoItem =>
        todoItem.id === id
          ? { ...todoItem, completed: event.target.checked }
          : todoItem,
      ),
    );
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label" htmlFor={`todoStatus-${id}`}>
        <input
          id={`todoStatus-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleChangeChecked}
        />
        {}
      </label>

      {focused ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={valueTitle}
            ref={field}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleClick}
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
          </button>
        </>
      )}

      {/* <Loader isLoad={isLoad} /> */}
    </div>
  );
};
