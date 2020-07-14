import React from 'react';
import PropTypes from 'prop-types';
import { ItemStatusFilter } from './ItemStatusFilter/ItemStatusFilter';
import ItemClearCompleted from './ItemClearCompleted/ItemClearCompleted';
import TodoLeftCounter from './TodoLeftCounter/TodoLeftCounter';

function Footer({
  todosCount,
  doneCount,
  filter,
  onFilterChange,
  clearHandler,
  completedTodos,
}) {
  return (
    <footer className="footer">
      <TodoLeftCounter todo={todosCount} done={doneCount} />
      <ul className="filters">
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </ul>
      <ItemClearCompleted
        clearHandler={clearHandler}
        completedTodos={completedTodos}
      />
    </footer>
  );
}

Footer.propTypes = {
  todosCount: PropTypes.number.isRequired,
  doneCount: PropTypes.number.isRequired,
  filter: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  clearHandler: PropTypes.func.isRequired,
  completedTodos: PropTypes.arrayOf.isRequired,
};

export default Footer;
