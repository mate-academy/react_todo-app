import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';

const Content = (props) => {
  const {
    todos,
    allCompleted,
    onCheck,
    onDelete,
    completeAll,
    todosLength,
  } = props;

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
        onCheck={onCheck}
        onDelete={onDelete}
      />
    </section>
  );
};

Content.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  allCompleted: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  completeAll: PropTypes.func.isRequired,
  todosLength: PropTypes.number.isRequired,
};

export default Content;
