import classNames from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext/TodoContext';
import { Keyboard } from '../enum/Keyboard';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, id, completed } = todo;
  const { todos, setTodos } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const replaceCompleted = (idTodo: number) => {
    const newTodo = todos.map(item => {
      if (item.id === idTodo) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return { ...item };
    });

    setTodos(newTodo);
  };

  const titleFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      titleFocus.current?.focus();
    }
  }, [isEditing]);

  const deleteTask = (idTodo: number) => {
    setTodos(todos.filter(prevTodo => prevTodo.id !== idTodo));
  };

  const editTodos = () => {
    setIsEditing(true);
  };

  const changeTudo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlurSeve = () => {
    if (isEditing) {
      const newTodos = [...todos];
      const findIndex = newTodos
        .findIndex(elem => elem.id === id);

      newTodos[findIndex].title = value;
      setTodos(newTodos);

      setIsEditing(false);
    }

    if (value.length === 0) {
      deleteTask(id);
    }
  };

  const handleInput = () => {
    setIsEditing(false);
    setValue(title);
  };

  const hendleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case Keyboard.Escape:
        return value.length === 0
          ? deleteTask(id)
          : handleInput();

      case Keyboard.Enter:
        return handleBlurSeve();

      default:
        return setIsEditing(true);
    }
  };

  return (
    <li className={classNames(
      {
        completed,
        editing: isEditing,
      }
    )}
    >
      <div className="completed">
        {!isEditing && (
          <>
            <input
              type="checkbox"
              className="toggle"
              id="toggle-view"
              checked={completed}
              onChange={() => replaceCompleted(id)}
            />
            <label
              onDoubleClick={editTodos}
            >
              {title}
            </label>
            <button
              type="button"
              className="destroy"
              aria-label="deleteTodo"
              data-cy="deleteTodo"
              onClick={() => deleteTask(id)}
            />
          </>
        )}
      </div>
      <input
        ref={titleFocus}
        type="text"
        value={value}
        className="edit"
        onChange={changeTudo}
        onKeyUp={hendleKeyup}
        onBlur={handleBlurSeve}
      />
    </li>
  );
};
