import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({
  item,
  todoList,
  setTodoList,
}) => {
  const [status, setStatus] = useState(item.completed);

  const changeStatus = () => {
    setTodoList(prevTodos => prevTodos.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    }));
    setStatus(!status);
  };

  const deleteTodo = (itemId) => {
    setTodoList(todoList.filter(todo => todo.id !== itemId));
  };

  useEffect(() => {
    setStatus(item.completed);
    setTodoList([...todoList]);
  }, [item.completed]);

  return (
    <li
      className={status ? 'completed' : ''}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={status}
          onChange={changeStatus}
        />
        <label>
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(item.id)}
        />
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  setTodoList: PropTypes.func.isRequired,
};
