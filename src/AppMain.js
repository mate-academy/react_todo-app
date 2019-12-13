import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';

const TodoMain = (props) => {
  const
    { todos, allCompleted, handleCheck, handleDelete, completeAll, todosLength }
    = props;

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={completeAll}
        checked={allCompleted}
      />
      {todosLength > 0 && (
        <label htmlFor="toggle-all">
          {allCompleted ? 'Mark all as active' : 'Mark all as completed'}
        </label>
      )}
      <TodoList
        todos={todos}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
    </section>
  );
};

TodoMain.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  allCompleted: PropTypes.bool.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  completeAll: PropTypes.func.isRequired,
  todosLength: PropTypes.number.isRequired,
};

export default TodoMain;
