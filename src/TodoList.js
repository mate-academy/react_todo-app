import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, destroy, checked, checkedAll }) => (

  <section className="main" style={{ display: 'block' }}>
    <label htmlFor="toggle-all">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={todos.every(i => i.completed) && todos.length !== 0}
        onChange={(event) => {
          checkedAll(event.target.checked);
        }
        }
      />
    </label>

    <ul className="todo-list">
      {todos.map(item => (
        <li key={item.id} className="">
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={item.id}
              checked={item.completed}
              onClick={() => checked(item.id)}
            />
            <label htmlFor="toggle">{item.title}</label>
            <button
              type="button"
              className="destroy"
              onClick={() => destroy(item.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  destroy: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
  checkedAll: PropTypes.func.isRequired,
};
export default TodoList;
