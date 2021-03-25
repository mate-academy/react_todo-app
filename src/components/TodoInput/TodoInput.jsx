import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const TodoInput = ({ onCreate }) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleTodo = useCallback(
    (event) => {
      const { value } = event.target;

      setInputQuery(value);
    }, [],
  );

  const handleSumbit = useCallback(
    (event) => {
      if (event.keyCode === 13 && inputQuery) {
        onCreate(inputQuery);
        setInputQuery('');
      }
    }, [inputQuery, onCreate],
  );

  return (
    <header className="header">
      <h1>Todos</h1>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputQuery}
        onChange={handleTodo}
        onKeyDown={handleSumbit}
      />
    </header>
  );
};

TodoInput.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
