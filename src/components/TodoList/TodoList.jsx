import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos,
  setStatus,
  destroyTodo,
  setTitleEditing,
  activeTodos }) => {

  const [saveTodos, setSaveTodos] = useState([])

  useEffect(() => {
    setSaveTodos(todos)
  }, [todos])

  const status = saveTodos.every(todo => todo.completed === true);

  const changeAllTodosStatus = (status) => {
    setSaveTodos(prevState => prevState.map(todo => (
      { ...todo, completed: status }
    )))
  };

  return (
    <section className="main">

      {saveTodos.length > 0 &&
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={status}
            onChange={() => changeAllTodosStatus(!status)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      }

      <ul className="todo-list">
        {saveTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setStatus={setStatus}
            destroyTodo={destroyTodo}
            setTitleEditing={setTitleEditing}
          />
        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  setStatus: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
  setTitleEditing: PropTypes.func.isRequired,
};
