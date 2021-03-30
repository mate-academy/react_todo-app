import React from 'react';
import PropTypes from 'prop-types';
import { TodoType } from '../../types';

export const Form = ({ handleQuery, query, setTodos, todos }) => {
  const createTodo = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (query.trim() !== '') {
        const newTodo = {
          id: +new Date(),
          title: query,
          completed: false,
        };

        handleQuery('');
        setTodos([newTodo, ...todos]);
      }
    }
  };

  const setTitle = event => handleQuery(event.target.value);

  return (
    <form onKeyDown={createTodo}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={setTitle}
      />
    </form>
  );
};

Form.propTypes = {
  handleQuery: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(TodoType.isRequired),
};

Form.defaultProps = {
  todos: [],
};
