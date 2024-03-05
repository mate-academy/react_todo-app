import React, { useContext, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { dispatch } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (inputValue.trim() === '') {
      dispatch({ type: 'delete', payload: id });
    } else {
      dispatch({ type: 'update', payload: { id, title: inputValue } });
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleBlur();
    } else if (event.key === 'Escape') {
      setInputValue(title);
      setIsEditing(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <li key={id} className={cn({ completed, editing: isEditing })}>
      <div className="view" onDoubleClick={handleDoubleClick}>
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => dispatch({ type: 'toggleStatus', payload: id })}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
          onClick={() => dispatch({ type: 'delete', payload: id })}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={inputValue}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </li>
  );
};
