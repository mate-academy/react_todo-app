import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoApp = ({ setTodoList }) => {
  const [todo, setTodo] = useState('');

  const addTodo = () => {
    if (!todo) {
      return;
    }

    setTodoList(prevTodos => (
      [
        ...prevTodos,
        {
          id: +new Date(),
          title: todo.trimRight(),
          completed: false,
        },
      ]
    ));
    setTodo('');
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        addTodo();
      }}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todo}
        onChange={event => setTodo(event.target.value.trimLeft())}
      />
    </form>
  );
};

TodoApp.propTypes = {
  setTodoList: PropTypes.func.isRequired,
};
