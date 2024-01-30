/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id, title, completed,
  } = todo;

  const [editValue, setEditValue] = useState(title);

  const [isEdit, setIsEdit] = useState(false);

  const [type, setType] = useState('view');

  const { setTodos, editTodo, deleteTodo } = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  useCallback(() => {
    if (completed) {
      setType('completed');
    } else if (isEdit) {
      setType('editing');
    }
  }, [isEdit, completed]);

  const handleCheck = () => {
    setTodos((currentTodos) => (
      currentTodos.map(currTodo => {
        if (currTodo.id === id) {
          return {
            ...currTodo,
            completed: !currTodo.completed,
          };
        }

        return currTodo;
      })
    ));
  };

  const handleDoubleClick = () => {
    setIsEdit(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handlerEditKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEdit(false);
    }

    if (event.key === 'Enter' && editValue) {
      editTodo(id, editValue);

      setIsEdit(false);
    } else if (event.key === 'Enter' && editValue === '') {
      deleteTodo(id);
      setIsEdit(false);
    }
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleBlur = () => {
    if (editValue) {
      editTodo(id, editValue);

      setIsEdit(false);
    } else if (!editValue) {
      deleteTodo(id);
      setIsEdit(false);
    }
  };

  return (
    <li className={cn({
      completed,
      editing: isEdit,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id.toString()}
          checked={completed}
          onClick={handleCheck}
        />

        <label
          htmlFor={`toggle-${type}`}
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={editValue}
        ref={inputRef}
        onChange={handleEditChange}
        onKeyUp={handlerEditKeyUp}
        onBlur={handleBlur}
      />
    </li>
  );
};
