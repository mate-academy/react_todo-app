import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TodosFilter } from '../TodosFilter';
import { TodoTypes } from '../TodoItem/TodoTypes';
import { deleteTodo } from '../../api/api';

export const Footer = ({
  todos,
  setTodos,
  setFilter,
}) => {
  const [hasCompletedTodos, setHasCompletedTodos] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setHasCompletedTodos(!todos.find(todo => todo.completed === true));
    setCount(() => todos.reduce(
      (acc, todo) => acc + (!todo.completed ? 1 : 0),
      0,
    ));
  }, [todos]);

  const handleClearCompleted = () => {
    todos.forEach(todo => todo.completed && (deleteTodo(todo.id)));
    setTodos(() => todos.filter(todo => todo.completed === false));
  };

  return (
    <>
      <span className="todo-count">
        {`${count} item${count > 1 ? 's' : ''} left`}
      </span>

      <TodosFilter
        setFilter={setFilter}
      />

      <button
        type="button"
        className="clear-completed"
        style={{ display: hasCompletedTodos ? 'none' : 'block' }}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(TodoTypes),
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
