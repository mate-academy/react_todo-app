import classNames from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const replaceCompleted = (id: number) => {
    const newTodo = [...todos];
    const findIndex = newTodo.findIndex(item => item.id === id);
    const valueCompleted = !newTodo[findIndex].completed;

    newTodo[findIndex] = {
      ...newTodo[findIndex],
      completed: valueCompleted,
    };
    newTodo.splice(findIndex, 1, newTodo[findIndex]);
    setTodos(newTodo);
  };

  const titleFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      titleFocus.current?.focus();
    }
  }, [isEditing]);

  const deleteTask = (id: number) => {
    const newTodo = [...todos];
    const findIndex = newTodo.findIndex(i => i.id === id);

    newTodo.splice(findIndex, 1);

    setTodos(newTodo);
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
        .findIndex(elem => elem.id === todo.id);

      newTodos[findIndex].title = value;
      setTodos(newTodos);

      setIsEditing(false);
    }
  };

  const hendleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (value.length === 0) {
        deleteTask(todo.id);
      }

      setIsEditing(false);
    }

    if (e.key === 'Enter') {
      handleBlurSeve();
    }
  };

  return (
    <li className={classNames(
      {
        completed: todo.completed,
        editing: isEditing,
      },
    )}
    >
      <div className="completed">
        {!isEditing && (
          <>
            <input
              type="checkbox"
              className="toggle"
              id="toggle-view"
              checked={todo.completed}
              onChange={() => replaceCompleted(todo.id)}
            />
            <label
              onDoubleClick={editTodos}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              aria-label="deleteTodo"
              data-cy="deleteTodo"
              onClick={() => deleteTask(todo.id)}
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
