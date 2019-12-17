import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({
  todosLength,
  isAllChecked,
  todos,
  handleItemDestroyer,
  handleItemsCheck,
  handleCheckedAll,
}) => (

  <section className="main" style={{ display: 'block' }}>
    {todosLength && (
      <>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={isAllChecked}
          onChange={() => handleCheckedAll(isAllChecked)}
        />
        {/*eslint-disable */
        <label htmlFor="toggle-all">Mark all as complete </label>
        /* eslint-enable */}
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
  todosLength: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAllChecked: PropTypes.func.isRequired,
  handleItemDestroyer: PropTypes.func.isRequired,
  handleItemsCheck: PropTypes.func.isRequired,
  handleCheckedAll: PropTypes.func.isRequired,
};
export default TodoList;
