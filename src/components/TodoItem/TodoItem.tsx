import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';
import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  todo: Todo;
  togLeTodo: (id: number) => void;
};

export const TodoItem:React.FC<Props> = ({ todo, togLeTodo }) => {
  const {
    setTodos,
    todos,
    handleDelete,
  } = useContext(TodosContext);

  const [value, setValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const doubleClick = () => {
    setIsEditing(true);
  };

  const clickEnterOrEsc = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (value.trim() === '') {
      handleDelete(todo.id);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      setIsEditing(false);
    }

    if (event.key === 'Escape') {
      setValue(todo.title);
      setIsEditing(false);
    }
  };

  const handleSave = (id: number) => {
    const newTodos = [...todos];
    const findIndex = newTodos.findIndex((el) => el.id === id);

    newTodos[findIndex].title = value;
    setTodos(newTodos);

    setIsEditing(false);
  };

  const todoFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoFocus.current && value) {
      todoFocus.current.focus();
    }
  }, [value]);

  return (
    <li
      key={todo.id}
      className={classNames(
        {
          completed: todo.completed,
          editing: isEditing,
        },
      )}
    >
      {/* <div className="completed"> */}
      {!isEditing && (
        <>
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={todo.completed}
            onChange={() => togLeTodo(todo.id)}
          />
          <label
            htmlFor="toggle"
            onDoubleClick={doubleClick}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => {
              handleDelete(todo.id);
            }}
          />
        </>
      )}
      {/* </div> */}
      <input
        type="text"
        className="edit"
        ref={todoFocus}
        onKeyUp={clickEnterOrEsc}
        value={value}
        onChange={handleTitle}
        onBlur={() => handleSave(todo.id)}
      />
    </li>
  );
};
