import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  togLeTodo: (id: number) => void;
};

export const TodoItem:React.FC<Props> = ({ todo, togLeTodo }) => {
  const {
    todos,
    handleDelete,
  } = useContext(TodosContext);

  const [value, setValue] = useState<string>(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const todoFocus = useRef<HTMLInputElement>(null);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const doubleClick = () => {
    setIsEditing(true);
  };

  const clickEnterOrEsc = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      if (value.trim() === '') {
        handleDelete(todo.id);
        setIsEditing(false);
      }

      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleSave = (id: number) => {
    const newTodos = [...todos];
    const findIndex = newTodos.findIndex((el) => el.id === id);

    newTodos[findIndex].title = value || todo.title;

    setIsEditing(false);
  };

  useEffect(() => {
    if (todoFocus.current && isEditing) {
      todoFocus.current.focus();
    }
  }, [isEditing]);

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
            onDoubleClick={doubleClick}
          >
            {todo.title}
          </label>
          {/* eslint-disable-next-line */}
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
