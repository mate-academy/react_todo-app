import React from 'react';
import PropsTypes from 'prop-types';
import Filters from './Filters';

const Footer = ({ todo, handleTodo, setFilter, todoState }) => {
  const handleClear = () => (
    handleTodo(todoState.filter(elem => !elem.isCompleted))
  );

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todo.filter(item => !item.isCompleted).length}
        items left`}
      </span>

      <ul className="filters">
        <Filters
          todo={todo}
          handleFilter={setFilter}
        />
      </ul>

      <button
        type="button"
        onClick={handleClear}
        className={`clear-completed
        ${todo.some(item => item.isCompleted)
      ? 'show__clear-button'
      : ''}`}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todo: PropsTypes.arrayOf.isRequired,
  handleTodo: PropsTypes.func.isRequired,
  setFilter: PropsTypes.func.isRequired,
  todoState: PropsTypes.arrayOf.isRequired,
};

export default Footer;
