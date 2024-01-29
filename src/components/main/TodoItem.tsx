import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../Store';

export const TodoItem = React.memo(({ todo }: { todo: Todo }) => {
  const dispatch = useContext(DispatchContext);
  const [editing, setEditing] = React.useState(false);
  const [inputText, setInputText] = React.useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent | { key:'Enter' }) => {
    switch (event.key) {
      case 'Enter':
        if (event.key === 'Enter' && inputText.trim().length < 1) {
          dispatch({ type: 'deleteTodo', payload: todo.id });
          setEditing(false);
        } else {
          dispatch({
            type: 'editTodo',
            payload: {
              id: todo.id,
              title: inputText,
              completed: todo.completed,
            },
          });
          setEditing(false);
        }

        break;
      case 'Escape':
        setInputText(todo.title);
        setEditing(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <li
      className={cn(
        { completed: todo.completed },
        { editing },
      )}
      onDoubleClick={() => setEditing(true)}
    >
      <div
        className="view"

      >
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id={`toggle-view-${todo.id}`}
          onChange={() => dispatch({ type: 'toggleTodo', payload: todo.id })}
        />
        <label htmlFor={`toggle-view-${todo.id}`}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete Todo"
          onClick={() => dispatch({ type: 'deleteTodo', payload: todo.id })}
        />
      </div>
      <input
        value={inputText}
        type="text"
        className="edit"
        onChange={(event) => setInputText(event.target.value)}
        onKeyUp={(event) => handleKeyDown(event)}
        onBlur={() => handleKeyDown({ key: 'Enter' })}
        ref={inputRef}
      />
    </li>
  );
});
