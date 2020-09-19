import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import { Todo } from '../Todo';

export const TodoList = ({ items, setTodos }) => {
  const handleStatus = (id) => {
    setTodos(prevTodos => prevTodos
      .map((item) => {
        if (id !== item.id) {
          return { ...item };
        }

        return {
          ...item,
          completed: !item.completed,
        };
      }));
  };

  return (
    <ul className="todo-list">
      {items.map(item => (
        <Todo
          item={item}
          key={item.id}
          handleStatus={handleStatus}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setTodos: PropTypes.func.isRequired,
};
