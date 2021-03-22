import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos,
  setStatus,
  destroyTodo,
  activeTodos,
  setAllTodosCompleted,
  setTitleEditing }) => {

  const [saveTodos, setSaveTodos] = useState(todos);

  useEffect(() => {
    setSaveTodos(todos);
  }, [todos]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={activeTodos.length}
        onChange={setAllTodosCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

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
  activeTodos: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  setAllTodosCompleted: PropTypes.func.isRequired,
  setTitleEditing: PropTypes.func.isRequired,
};
