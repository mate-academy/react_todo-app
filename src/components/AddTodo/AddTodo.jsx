import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AddTodo = ({ sendTodo }) => {
  const [todoTitle, enterTodoTitle] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (todoTitle.trim().length <= 0) {
          return;
        }

        sendTodo({
          id: +new Date(),
          title: todoTitle.trim(),
          completed: false,
        });

        enterTodoTitle('');
      }}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={({ target }) => {
          enterTodoTitle(target.value);
        }}
      />
    </form>
  );
};

AddTodo.propTypes = {
  sendTodo: PropTypes.func.isRequired,
};
