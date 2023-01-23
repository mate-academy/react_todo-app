/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FaRegEdit } from 'react-icons/fa';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  data:Todo[];
  setData:(data: Todo[]) => void;
};

export const Main: React.FC <Props> = ({ data, setData }) => {
  const [editTodo, setEditTodo] = useState(0);
  const [editValue, setEditValue] = useState('');
  const [isToggleAll, setIsToggleAll] = useState(false);

  const handleRemove = (id:number) => {
    const newList = data.filter((item) => item.id !== id);

    setData(newList);
  };

  const handleCheck = (id:number): void => {
    setData(data.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const handleToggleAll = () => {
    setIsToggleAll(!isToggleAll);

    if (isToggleAll) {
      setData(data.map(todo => {
        return {
          ...todo,
          completed: false,
        };
      }));
    }

    if (!isToggleAll) {
      setData(data.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      }));
    }
  };

  const handleEdit = (id:number, title: string) => {
    setEditTodo(id);
    setEditValue(title);
  };

  // save changes onBlur
  const handleSubmitValue = (id:number) => {
    const newValue = data.map(todo => {
      if (todo.id === id) {
        // eslint-disable-next-line no-param-reassign
        todo.title = editValue;
      }

      return todo;
    });

    setData(newValue);
    setEditTodo(0);

    data.map(todo => {
      if (!todo.title) {
        handleRemove(id);
      }

      return todo;
    });
  };

  // save changes with Enter press
  const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>, id:number) => {
    if (e.code === 'Enter') {
      handleSubmitValue(id);
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAll}
        checked={isToggleAll}
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>

      <ul className="todo-list" data-cy="todoList">
        {data.map(todo => (
          <li
            className={classNames(
              { completed: todo.completed }, { editing: editTodo === todo.id },
            )}
            data-id={todo.id}
            key={todo.id}

          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id="toggle-view"
                onChange={() => handleCheck(todo.id)}
                checked={todo.completed}
                value={editValue}
              />
              <label>
                {todo.title}
              </label>
              <button
                type="button"
                className="destroy"
                data-cy="deleteTodo"
                onClick={() => handleRemove(todo.id)}
              />
              <button
                type="button"
                className="change"
                data-cy="deleteTodo"
                onClick={() => handleEdit(todo.id, todo.title)}
              >
                <FaRegEdit />
              </button>
            </div>
            <input
              type="text"
              className="edit"
              value={editValue}
              onChange={(event) => setEditValue(event.target.value)}
              onKeyDown={(e) => handleEnter(e, todo.id)}
              onBlur={() => handleSubmitValue(todo.id)}
            />
          </li>

        ))}
      </ul>
    </section>
  );
};
