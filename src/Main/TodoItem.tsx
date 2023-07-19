/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../utils/types/type';

type ClassName = 'completed' | 'view' | 'editing';

type Props = {
  item: Todo,
  setTodos: (todos: Todo[]) => void,
  todos: Todo[],
  setIsProcessing: (ids: number[]) => void,
  isProcessing: number[],
};

export const TodoItem:React.FC<Props> = ({
  item, setTodos, todos, isProcessing, setIsProcessing,
}) => {
  const { id, title, completed } = item;
  const [editingTitle, setEditingTitle] = useState(item.title);
  const [isEditing, setIsEditing] = useState(false);
  const focusRef = useRef<HTMLInputElement>(null);

  const handleChangeItem = (itemToChange:
  { [key: string]: boolean | string }) => {
    setIsProcessing([...isProcessing, id]);
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          ...itemToChange,
        };
      }

      return todo;
    }));
  };

  const editTitle = (titleToEdit: string = editingTitle) => {
    if (!editingTitle) {
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      handleChangeItem({ title: titleToEdit });
    }

    setIsEditing(false);
  };

  const handleEditTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      editTitle();
    }

    if (e.key === 'Escape') {
      editTitle(title);
    }
  };

  const getClassName = () => {
    let className: ClassName;

    className = completed ? 'completed' : 'view';

    if (isEditing) {
      className = 'editing';
    }

    return className;
  };

  const currentClassName = getClassName();

  useEffect(() => {
    focusRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    setIsEditing(false);
  }, [focusRef]);

  return (
    <li
      className={currentClassName}
    >
      {!isEditing ? (
        <div className={currentClassName}>
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${currentClassName}`}
            checked={completed}
            onClick={() => handleChangeItem({ completed: !completed })}
          />
          <label onDoubleClick={() => setIsEditing(true)}>{title }</label>

          {!isProcessing.includes(id) && (
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => setTodos(todos.filter(todo => todo.id !== id))}
            />
          )}
        </div>
      ) : (

        <input
          ref={focusRef}
          type="text"
          className="edit"
          placeholder="An empty name will be deleted"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onKeyDown={(e) => handleEditTitle(e)}
          onBlur={() => editTitle()}
        />

      )}

      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        {' '}
        {isProcessing.includes(id) && <span className="loader" />}
      </div>

    </li>
  );
};
