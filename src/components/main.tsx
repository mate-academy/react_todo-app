/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FaRegEdit } from 'react-icons/fa';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  data:Todo[];
  setData:any;
  // input: string;
  // setInput: any
};

export const Main: React.FC <Props> = ({ data, setData }) => {
  const [editTodo, setEditTodo] = useState(0);
  const [editValue, setEditValue] = useState('');

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

  // const handleToggleAll = () => {
  //   setData(data.map(todo => {
  //     return {
  //       ...todo,
  //       completed: !todo.completed,
  //     };
  //   }));
  // };

  const [isToggleAll, setIsToggleAll] = useState(false);

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

    if (data.length === 0) {
      setIsToggleAll(false);
    }
  };

  const handleEdit = (id:number, title: string) => {
    setEditTodo(id);
    setEditValue(title);
  };

  const handleSubmitValue = (e: any, id:number) => {
    const newValue = [...data].map(todo => {
      if (todo.id === id) {
        todo.title = editValue;
      }

      return todo;
    });

    if (e.key === 'Enter') {
      setData(newValue);
      setEditTodo(0);
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
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {data.map(todo => (
          <li
            // className={classNames({ completed: todo.completed })}
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
              <label
                htmlFor="toggle-view"

              >
                {todo.title}
              </label>
              <button
                type="button"
                className="destroy btn"
                data-cy="deleteTodo"
                onClick={() => handleRemove(todo.id)}
              />
              <button
                type="button"
                className="change btn"
                data-cy="deleteTodo"
                // disabled={}
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
              onKeyDown={(e) => handleSubmitValue(e, todo.id)}
            />
          </li>

        ))}
      </ul>
    </section>
  );
};

/*
<li className="completed">
  <div className="view">
    <input type="checkbox" className="toggle" id="toggle-completed" />
    <label htmlFor="toggle-completed">qwertyuio</label>
    <button type="button" className="destroy" data-cy="deleteTodo" />
  </div>
  <input type="text" className="edit" />
</li>

<li className="editing">
  <div className="view">
    <input type="checkbox" className="toggle" id="toggle-editing" />
    <label htmlFor="toggle-editing">zxcvbnm</label>
    <button type="button" className="destroy" data-cy="deleteTodo" />
  </div>
  <input type="text" className="edit" />
</li>

<li>
  <div className="view">
    <input type="checkbox" className="toggle" id="toggle-view2" />
    <label htmlFor="toggle-view2">1234567890</label>
    <button type="button" className="destroy" data-cy="deleteTodo" />
  </div>
  <input type="text" className="edit" />
</li> */
