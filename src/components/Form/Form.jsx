import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export function Form({ onAddTodo }) {
  const notificationPosition = { position: 'top-left' };
  const [value, setValue] = useState('');
  const handleInputValue = event => setValue(event.target.value);

  const handleKeypress = (e) => {
    if (!value.trim() && e.key === 'Enter') {
      toast.error('You cannot add empty field', notificationPosition);
    }

    if (e.key === 'Enter' && value.trim()) {
      const newTodo = {
        id: `${+new Date()}`,
        title: value,
        completed: false,
      };

      onAddTodo(newTodo);
      setValue('');
      toast.success('Congratulation your Todo was added', notificationPosition);
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
