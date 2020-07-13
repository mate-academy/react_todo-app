import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TodoFilter = ({ onClick, children, filterType }) => (
  <li>
    <a
      href={`#/${filterType === 'all' ? '' : filterType}`}
      className={classnames({
        selected: filterType === children.toLowerCase(),
      })}
      onClick={onClick}
    >
      {children}
    </a>
  </li>
);

TodoFilter.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
};

export default TodoFilter;
