import React, { useState, useCallback, useEffect } from 'react';
import { Todo } from '../../Types/Todo';
import { changeTodoTitle } from '../../api/api';

export type Props = {
  todos: Todo[],
  setCompleted: (id: number) => void,
  handleCheckbox: (todo: Todo) => void,
  sortQuery: string,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setCompleted,
  handleCheckbox,
  sortQuery,
}) => {
  const [changeTodo, setChangeTodo] = useState(0);
  const [value, setValue] = useState('');

  const filterArr = (arr: Todo[]) => {
    return arr.filter(todo => {
      if (sortQuery === 'active') {
        return todo.completed === false;
      }

      if (sortQuery === 'completed') {
        return todo.completed === true;
      }

      return todo;
    });
  };

  const changeTitle = (id: number, e: any) => {
    if (e.key === 'Enter') {
      changeTodoTitle(id, value);

      setTimeout(() => {
        setValue('');
        setChangeTodo(0);
      }, 500);
    }
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setChangeTodo(0);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <ul className="todo-list">
      {filterArr(todos).map(todo => (
        <li
          key={todo.id}
          onDoubleClick={() => {
            return !changeTodo ? setChangeTodo(todo.id) : setChangeTodo(0);
          }}
          onMouseLeave={() => setChangeTodo(0)}
        >
          <div className="view">
            <input
              type="checkbox"
              className={!todo.completed ? 'toggle' : 'toggle chaked'}
              onClick={() => handleCheckbox(todo)}
            />
            <label
              htmlFor="change-title"
              className={!todo.completed ? 'unchaked' : 'chaked'}
            >
              {changeTodo === todo.id ? (
                <input
                  type="text"
                  className="edit-input"
                  id="change-title"
                  onChange={(e) => setValue(e.currentTarget.value)}
                  value={value}
                  onKeyPress={(e) => changeTitle(todo.id, e)}
                />
              ) : (
                todo.title
              )}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => setCompleted(todo.id)}
              aria-label="button"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
