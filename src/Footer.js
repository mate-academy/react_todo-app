import React from 'react';
import propTypes from 'prop-types';

const Footer = ({
  todoList, selected, deleteChecked, filterArray, filter,
}) => (
  <footer
    className="footer"
    style={todoList.length > 0
      ? { display: 'block' }
      : { display: 'none' }}
  >
    <span className="todo-count">
      {
        `${todoList.filter(todo => !todo.completed).length}
             items left`
      }
    </span>

    <ul className="filters">
      {
        filterArray.map(item => (
          <li key={item}>
            <button
              type="button"
              onClick={filter}
              className={
                selected === item.toLowerCase()
                  ? `selected`
                  : ''
              }
              name={item.toLowerCase()}
            >
              {item}
            </button>
          </li>
        ))
      }
    </ul>

    <button
      type="button"
      className="clear-completed"
      style={{ display: 'block' }}
      onClick={deleteChecked}
    >
        Clear completed
    </button>
  </footer>
);

Footer.propTypes = propTypes.state;

export default Footer;
