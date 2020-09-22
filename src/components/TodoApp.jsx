import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoApp = ({ getTodo }) => {
  const [todo, setTodo] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (todo.length > 0) {
          getTodo(+new Date(), todo.trim());
          setTodo('');
        }

        return;
      }}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todo}
        onChange={({ target }) => setTodo(target.value.trimLeft())}
      />
    </form>
  );
};

TodoApp.propTypes = {
  getTodo: PropTypes.func.isRequired,
};
