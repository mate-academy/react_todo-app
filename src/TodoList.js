import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodolList = ({
  toggle, deleteTodo, handleChackAll, todosVisible,
}) => (
  <section className="main">
    <input
      type="checkbox"
      className="toggle-all"
      id="toggle-all"
      onChange={handleChackAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {todosVisible.map(todo => (
        <Todo
          key={todo.id}
          item={todo}
          toggle={toggle}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  </section>
);

TodolList.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number,
  }).isRequired,
  toggle: PropTypes.func,
  deleteTodo: PropTypes.func.isRequired,
  handleChackAll: PropTypes.func.isRequired,
  todosVisible: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object])).isRequired,
};

TodolList.defaultProps = {
  toggle: null,
};

export default TodolList;
