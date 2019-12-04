import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({
  filtredTodos, toggleAll, onChangeStatus, onDestroyTodo, onChangeAllStatus,
}) => (
  <section className="main" style={{ display: 'block' }}>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={toggleAll}
      onChange={() => onChangeAllStatus(toggleAll)}
    />
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {
        filtredTodos.map(todo => (
          <Todo
            {...todo}
            onChangeStatus={onChangeStatus}
            onDestroyTodo={onDestroyTodo}
            key={todo.id}
          />
        ))
      }
    </ul>
  </section>
);

TodoList.propTypes = {
  filtredTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    complete: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  toggleAll: PropTypes.bool,
  onChangeStatus: PropTypes.func.isRequired,
  onDestroyTodo: PropTypes.func.isRequired,
  onChangeAllStatus: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  toggleAll: false,
};

export default TodoList;
