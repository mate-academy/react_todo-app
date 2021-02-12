import React, { useState, useEffect } from 'react';
import { usePrevious } from 'react-hanger';
import PropTypes from 'prop-types';

export const Header = ({ onAddNewTodo, todos }) => {
  const [title, setTitle] = useState('');
  const prevTodos = usePrevious(todos);

  useEffect(() => {
    const saveTitle = localStorage.getItem('title');

    if (saveTitle) {
      setTitle(saveTitle);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('title', title);
  }, [title]);
  const addNewTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: prevTodos && prevTodos.length + 1,
      title,
      completed: false,
    };

    onAddNewTodo(newTodo);
    setTitle('');
  };

  const onHandle = e => setTitle(e.target.value);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addNewTodo}>
        <input
          value={title}
          onChange={onHandle}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

Header.propTypes = {
  onAddNewTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
