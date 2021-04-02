import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

export const TodoList = ({ todos, setTodos, filterTodos, setFilterTodos }) => {
  const removeHandler = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul className="todo-list">
      {filterTodos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          filterTodos={filterTodos}
          removeHandler={removeHandler}
          setFilterTodos={setFilterTodos}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ),
  setTodos: PropTypes.func.isRequired,
  filterTodos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ),
  setFilterTodos: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  filterTodos: [],
};
