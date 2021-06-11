import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function NewTodo({ handleSubmit }) {
  const [todo, setTodo] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(todo);
        setTodo('');
      }}
    >
      <input
        value={todo}
        onChange={e => setTodo(e.target.value)}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
}

NewTodo.propTypes = {
  handleSubmit: PropTypes.func,
};

NewTodo.defaultProps = {
  handleSubmit: () => {},
};
