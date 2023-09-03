/* eslint-disable jsx-a11y/control-has-associated-label */

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { useTodos } from '../hooks/useTodo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useTodos();

  const { title, completed, id } = todo;

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  const handleCheckboxChange = () => {
    const toggleCompleted = () => {
      return todos.map(currentTodo => {
        if (currentTodo.id === id) {
          return { ...currentTodo, completed: !currentTodo.completed };
        }

        return currentTodo;
      });
    };

    setTodos(toggleCompleted());
  };

  const removeItem = () => {
    const handleRemove = todos.filter(currentTodo => currentTodo.id !== id);

    setTodos(handleRemove);
  };

  const updateItem = () => {
    const newTodos = todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return { ...currentTodo, title: newTitle };
      }

      return currentTodo;
    });

    setTodos(newTodos);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNewTitle(value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !newTitle.length) {
      removeItem();
    }

    if (event.key === 'Enter' && newTitle.length) {
      updateItem();
      setIsEdit(false);
    }
  };

  const handleInputKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEdit(false);
    }
  };

  const handleLableDoubleClick = () => {
    setIsEdit(true);
    inputRef.current?.focus();
  };

  const handleInputBlur = () => {
    if (!newTitle.length) {
      removeItem();
    }

    if (newTitle.length) {
      updateItem();
    }

    setIsEdit(false);
  };

  return (
    <li
      className={cn({
        completed,
        editing: isEdit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <label
          onDoubleClick={handleLableDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={removeItem}
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        onKeyUp={handleInputKeyUp}
      />
    </li>
  );
};
