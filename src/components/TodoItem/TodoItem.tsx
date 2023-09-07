/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodos } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo,
  id: string,
};

export const TodoItem: React.FC<Props> = ({ todo, id }) => {
  const { todos, setTodos } = useTodos();

  const [newTitle, setNewTitle] = useState(todo.title);

  const newTitleField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todo.isEditing && newTitleField.current) {
      newTitleField.current.focus();
    }
  }, [todo.isEditing]);

  const handleCheckboxChange = () => {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleClick = () => {
    const todosAfterRemoving = todos.filter(item => item.id !== +id);

    setTodos(todosAfterRemoving);
  };

  const handleDoubleClick = () => {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, isEditing: true };
      }

      return item;
    });

    setTodos(updatedTodos);

    if (newTitleField.current && todo.isEditing) {
      newTitleField.current.focus();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setNewTitle(event.target.value);
      const updatedTodos = todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, isEditing: false, title: newTitle };
        }

        return item;
      });

      if (!newTitle.trim()) {
        const newTodos = todos.filter(item => item.id !== todo.id);

        setTodos(newTodos);

        return;
      }

      setTodos(updatedTodos);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      const updatedTodos = todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, isEditing: false };
        }

        return item;
      });

      setTodos(updatedTodos);
    }
  };

  const blurHandle = () => {
    setNewTitle(newTitle);
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, isEditing: false, title: newTitle };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: todo.isEditing,
      })}
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          id={todo.id.toString()}
          onChange={handleCheckboxChange}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </label>
        <button
          onClick={handleClick}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      {todo.isEditing && (
        <input
          onChange={handleInputChange}
          type="text"
          className="edit"
          value={newTitle}
          ref={newTitleField}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={blurHandle}
        />
      )}
    </li>
  );
};
