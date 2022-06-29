/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import classNames from 'classnames';

export const TodoItem = React.memo(({
  todos,
  todo,
  setTodos,
  setInput,
}) => {
  const [toggle, setToggle] = useState(false);

  const deleteHandler = () => {
    setTodos(todos.filter(item => todo.id !== item.id));
  };

  const completeHandler = () => {
    setTodos(todos.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    }));
  };

  const onEditHandler = (e) => {
    if (e.key === 'Enter' && e.target.value.trim().length > 0) {
      setInput(e.target.value);
      setTodos(todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            title: e.target.value,
          };
        }

        return item;
      }));
      setToggle(false);
      setInput('');
    }

    if (e.key === 'Enter' && e.target.value.trim().length === 0) {
      setTodos(todos.filter(item => item.id !== todo.id));
    }

    if (e.key === 'Escape') {
      setToggle(false);
    }
  };

  const onLeaveHandler = (e) => {
    if (e.target.value.length > 0) {
      setInput(e.target.value);
      setTodos(todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            title: e.target.value,
          };
        }

        return item;
      }));
      setToggle(false);
      setInput('');
    }

    if (e.target.value.length === 0) {
      setToggle(false);
    }
  };

  return (
    <li className={classNames('', {
      completed: todo.completed,
      editing: toggle,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={completeHandler}
          checked={todo.completed}
        />
        <label
          onDoubleClick={() => setToggle(true)}
        >
          {todo.title}
        </label>
        <button
          onClick={deleteHandler}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      {toggle && (
        <input
          type="text"
          className="edit"
          id="editTodo"
          onKeyUp={e => onEditHandler(e)}
          onBlur={e => onLeaveHandler(e)}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={toggle}
        />
      )}
    </li>
  );
});
