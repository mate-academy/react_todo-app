import {
  FC, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../../types/Todo';
import { useDispatch } from '../../../contexts/TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    dispatch({ type: 'deleteTodo', payload: id });
  };

  const handleToggleTodo = () => {
    dispatch({ type: 'toggleTodo', payload: id });
  };

  const handleEditTodo = () => {
    const value = inputRef.current?.value.trim();

    if (!value) {
      handleDeleteTodo();
    } else {
      dispatch({
        type: 'editTodo',
        payload: { ...todo, title: value },
      });
    }

    setIsEditMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) {
      return;
    }

    if (e.code === 'Enter') {
      handleEditTodo();
    } else if (e.code === 'Escape') {
      inputRef.current.value = title;

      setIsEditMode(false);
    }
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <li className={classNames({
      completed,
      editing: isEditMode,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleToggleTodo}
        />
        <label onDoubleClick={() => setIsEditMode(true)}>
          {title}
        </label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          onClick={handleDeleteTodo}
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit"
        defaultValue={title}
        onBlur={handleEditTodo}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};
