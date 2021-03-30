import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { TodosContext } from '../../utils/TodosContext';
import { createTodo } from '../../utils/api';
import { errorTextPost } from '../../utils/constants';

export const TodoApp = React.memo(({ userName }) => {
  const [title, setTitle] = useState('');
  const [isPostedErr, setIsPostedErr] = useState(false);
  const { setTodos } = useContext(TodosContext);

  const postTodo = async(todo) => {
    setIsPostedErr(false);
    try {
      const result = await createTodo(todo.title);

      setTodos(prev => [...prev, { ...todo, id: result.id }]);
    } catch (error) {
      setIsPostedErr(true);
    }
  };

  const handleOnSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!title.trim()) {
        return;
      }

      postTodo({
        id: +new Date(),
        title,
        completed: false,
      });
      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      {userName && (
        <span className="signature">{userName}</span>
      )}
      {isPostedErr && (
        <span className="posted">{errorTextPost}</span>
      )}
      <form>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => {
            setIsPostedErr(false);
            setTitle(event.target.value);
          }}
          onKeyDown={handleOnSubmit}
        />
      </form>
    </header>
  );
});

TodoApp.defaultProps = {
  userName: '',
};

TodoApp.propTypes = {
  userName: PropTypes.string,
};
