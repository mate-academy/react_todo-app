import React from 'react';
import createClass from 'classnames';

const FilterItem = ({
  href,
  dataFilter,
  onClick,
  anchor,
  filter
}) => {
  const linkOfFilterClass = createClass({'selected': dataFilter === filter});

  return (
    <li>
      <a
        href={href}
        data-filter={dataFilter}
        className={linkOfFilterClass}
        onClick={onClick}
      >
        {anchor}
      </a>
    </li>
  );
}

export default FilterItem;
