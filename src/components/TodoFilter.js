import React from 'react';
import classnames from 'classnames';
import { TodoFilterShape } from '../Shapes';

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

TodoFilter.propTypes = TodoFilterShape.isRequired;

export default TodoFilter;
