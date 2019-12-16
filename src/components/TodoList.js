import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({
  isAllChecked,
  todos,
  handleItemDestroyer,
  handleItemsCheck,
  handleCheckedAll,
}) => (

  <section className="main" style={{ display: 'block' }}>
    {todos.length > 0 && (
      <>
        <label htmlFor="toggle-all">
        Mark all as complete
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={isAllChecked}
            onChange={() => handleCheckedAll(isAllChecked)}
          />
        </label>
      </>
    )}
    <ul className="todo-list">
      {}
      {todos.map(item => (
        <li className="">
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={item.completed}
              onClick={() => handleItemsCheck(item.id)}
            />

            <label htmlFor="todo-1">{item.title}</label>
            <button
              type="button"
              className="destroy"
              onClick={() => handleItemDestroyer(item.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAllChecked: PropTypes.func.isRequired,
  handleItemDestroyer: PropTypes.func.isRequired,
  handleItemsCheck: PropTypes.func.isRequired,
  handleCheckedAll: PropTypes.func.isRequired,
};
export default TodoList;
