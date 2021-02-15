import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Filter } from '../Filter';
import { TodoTypes } from '../Todo/TodoTypes';
import { deleteTodo } from '../../api/api';

export const Footer = ({
  todos,
  onTodosSet,
  onFilterSet,
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

  const handleTodosCompletedClear = () => {
    todos.forEach(todo => todo.completed && (deleteTodo(todo.id)));
    onTodosSet(() => todos.filter(todo => !todo.completed));
  };

  return (
    <>
      <span className="todo-count">
        {`${count} item${count > 1 ? 's' : ''} left`}
      </span>

      <Filter
        onFilterSet={onFilterSet}
      />

      <button
        type="button"
        className="clear-completed"
        style={{ display: hasCompletedTodos ? 'none' : 'block' }}
        onClick={handleTodosCompletedClear}
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
  onTodosSet: PropTypes.func.isRequired,
  onFilterSet: PropTypes.func.isRequired,
};
