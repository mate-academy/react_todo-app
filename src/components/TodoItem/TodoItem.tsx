import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/todo.types';
import { useTodo } from '../../context/TodoContext';

type Props = {
  todo: Todo,
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, id, completed } = todo;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isInEdit, setIsInEdit] = useState(false);
  const [value, setValue] = useState(title);
  const { removeTodo, changeTodoStatus, editTodo } = useTodo();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInEdit]);

  const handleDelete = () => {
    removeTodo(id);
  };

  const handleStatusChange = () => {
    changeTodoStatus(id, !completed);
  };

  const handleDoubleClick = () => {
    setIsInEdit(true);
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const saveChange = () => {
    editTodo(id, value);
    setValue(value);
    setIsInEdit(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveChange();
    }

    if (e.key === 'Escape') {
      setValue(title);
      setIsInEdit(false);
    }
  };

  const handleBlur = () => {
    if (isInEdit) {
      saveChange();
    }
  };

  return (
    <li
      className={cn(
        {
          completed,
          editing: isInEdit,
        },
      )}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleStatusChange}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        >
          X
        </button>
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit"
        onChange={handleEditChange}
        value={value}
        onBlurCapture={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};

export default TodoItem;
