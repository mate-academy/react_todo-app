import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function Form({ onAddTodo }) {
  const [value, setValue] = useState('');
  const handleInputValue = event => setValue(event.target.value);

  const handleKeypress = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      const newTodo = {
        id: `${+new Date()}`,
        title: value,
        completed: false,
      };

      onAddTodo(newTodo);
      setValue('');
    }
  };

  return (
    <form>
      <input
        type="text"
        value={value}
        onChange={handleInputValue}
        onKeyPress={handleKeypress}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
}

Form.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};
