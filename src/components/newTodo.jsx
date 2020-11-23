import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodo = React.memo(
  ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleChange = (ev) => {
      setValue(ev.target.value);
    };

    const handleSubmit = useCallback((ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        addTodo(value);
        setValue('');
      }
    }, [value]);

    return (
      <form>
        <input
          type="text"
          value={value}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleChange}
          onKeyPress={handleSubmit}
        />
      </form>
    );
  },
);

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
