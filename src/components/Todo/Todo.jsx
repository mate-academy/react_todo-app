import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';

export const Todo = ({ todo, onCheckedTodos, onDelete, onEditTodo }) => {
  const [value, setValue] = useState(todo.title);
  const [isEding, setIsEding] = useState(false);

  const toggleTodo = () => {
    onCheckedTodos({
      ...todo,
      completed: !todo.completed,
    });
  };

  const changeTodo = (event) => {
    setValue(event.target.value);
  };

  const handelEdit = (event) => {
    if (event.key === 'Enter') {
      if (!value) {
        setValue(todo.title);
        setIsEding(false);

        return;
      }

      const editTodo = {
        ...todo,
        title: value,
      };

      onEditTodo(editTodo);

      setIsEding(false);
    }
  };

  const addNotChange = (event) => {
    if (event.key === 'Escape') {
      setValue(todo.title);
      setIsEding(false);
    }
  };

  return (
    <li className={classNames({
      editing: isEding,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={toggleTodo}
        />
        <label
          onDoubleClick={() => setIsEding(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => onDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={value}
        onChange={changeTodo}
        onKeyPress={handelEdit}
        onKeyDown={addNotChange}
      />
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onCheckedTodos: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};
