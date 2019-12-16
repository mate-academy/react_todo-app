import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ checkAll, filteredTodos, check, destroy }) => (
  <section className="main" style={{ display: 'block' }}>
    <input
      onChange={checkAll}
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
    />
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      { filteredTodos.map(todo => (
        <li className={todo.completed ? 'completed' : ''} key={todo.id}>
          <div className="view">
            <input
              id={todo.id}
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={e => check(e, todo.id)}
            />
            <label htmlFor={todo.id}>{todo.text}</label>
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              className="destroy"
              onClick={
                () => destroy(todo.id)
              }
            />
          </div>
        </li>
      ))
      }
    </ul>
  </section>
);

TodoList.propTypes = {
  checkAll: PropTypes.func.isRequired,
  filteredTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  check: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
};

export default TodoList;
