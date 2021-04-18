import React from 'react';
import PropTypes from 'prop-types';
import { TodosFilter } from '../TodosFilter';
import { ClearCompleted } from '../ClearCompleted';

export const Footer = ({
  activeTodos,
  clearAllCompleted,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {`${activeTodos.length} items left`}
    </span>
    <TodosFilter />
    <ClearCompleted clearAllCompleted={clearAllCompleted} />
  </footer>
);

Footer.propTypes = {
  activeTodos: PropTypes.func.isRequired,
  clearAllCompleted: PropTypes.func.isRequired,
};
