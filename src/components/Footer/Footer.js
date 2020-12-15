import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Filters } from '../Filters';

export function Footer({
  todos,
  setFilterStatus,
  filterStatus,
  clearAllCompleted,
}) {
  const [haveCompletedTodos, setHaveCompletedTodos] = useState(false);

  useEffect(() => {
    const haveCompleted = todos.some(todo => (
      todo.completed === true
    ));

    setHaveCompletedTodos(haveCompleted);
  }, [todos]);

  return (
    <footer className="footer">
      {!!todos.length && (
        <span className="todo-count">
          {`${todos.length} item(s) left`}
        </span>
      )}

      <Filters
        setFilterStatus={setFilterStatus}
        filterStatus={filterStatus}
        haveCompletedTodos={haveCompletedTodos}
      />

      {haveCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearAllCompleted}
        >
          Clear completed tasks
        </button>
      )}

    </footer>
  );
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isReuired,
      title: PropTypes.string.isReuired,
      completed: PropTypes.bool.isReuired,
    }).isRequired,
  ).isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  clearAllCompleted: PropTypes.func.isRequired,
};
