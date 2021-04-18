import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({
  setStatus,
  changeTitle,
  removeTodo,
  completedAll,
  filterTodos,
}) => {
  const [checked, setChecked] = useState(false);
  const [saveTodos, setSaveTodos] = useState([]);

  useEffect(() => {
    setSaveTodos(filterTodos);
  }, [filterTodos]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={checked}
        onChange={({ target }) => {
          setChecked(!checked);
          completedAll(target.checked);
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        <TodoItem
          saveTodos={saveTodos}
          setStatus={setStatus}
          changeTitle={changeTitle}
          removeTodo={removeTodo}
        />
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  setStatus: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  completedAll: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};
