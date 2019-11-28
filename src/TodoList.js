import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodolList = ({
  toggle, deleteTodo, handleChackAll, todos, renameTodo,
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
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          toggle={toggle}
          deleteTodo={deleteTodo}
          renameTodo={renameTodo}
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
  todos: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object])).isRequired,
  renameTodo: PropTypes.func.isRequired,
};

TodolList.defaultProps = {
  toggle: null,
};

export default TodolList;
