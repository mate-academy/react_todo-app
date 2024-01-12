/* eslint-disable no-console */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { DispatchContext } from '../../store/store';
import { Todo } from '../../types/Todo';
import { ActionType } from '../../types/ActionType';

import './TodoItem.scss';

type Props = {
  todo: Todo;
};

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const inputEditRef = useRef<HTMLInputElement>(null);

  const toggleTodo = (todoId: number) => {
    dispatch({ type: ActionType.Toggle, payload: todoId });
  };

  const deleteTodo = (todoId: number) => {
    dispatch({ type: ActionType.Delete, payload: todoId });
  };

  const updateTodo = () => {
    if (!tempTodo) {
      return;
    }

    const isEqualTitles = (todo.title === tempTodo.title);
    const isEmptyTitle = (tempTodo.title === '');

    if (!isEqualTitles && !isEmptyTitle) {
      dispatch({ type: ActionType.Update, payload: tempTodo });
    }

    if (isEmptyTitle) {
      dispatch({ type: ActionType.Delete, payload: tempTodo.id });
    }

    setTempTodo(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value.trim();
    const newTodo = { ...tempTodo, title: newTitle } as Todo;

    setTempTodo(newTodo);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateTodo();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTempTodo(null);
    }
  };

  const handleOnBlur = () => {
    updateTodo();
  };

  useEffect(() => {
    inputEditRef.current?.focus();
  }, [tempTodo?.id]);

  const isEditing = useMemo(
    () => todo.id === tempTodo?.id,
    [todo.id, tempTodo?.id],
  );

  return (
    <li className={cn(
      { completed: todo.completed },
      { editing: isEditing },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={() => setTempTodo(todo)}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={inputEditRef}
        value={tempTodo?.title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={handleOnBlur}
      />
    </li>
  );
};
