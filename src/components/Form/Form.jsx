import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const Form = ({ setTodos, todos }) => {
  const [titleValue, setTitleValue] = useState('');

  const handleChange = event => (
    setTitleValue(event.target.value)
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!titleValue) {
        return;
      }

      setTodos([
        ...todos,
        {
          title: titleValue,
          completed: false,
          id: +new Date(),
        },
      ]);
      setTitleValue('');
    }, [titleValue],
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={titleValue}
        onChange={handleChange}
      />
    </form>
  );
};

Form.propTypes = {
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ),
};

Form.defaultProps = {
  todos: [],
};
