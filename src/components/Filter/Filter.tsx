import { useState } from 'react';
import classNames from 'classnames';
import { FilterType } from '../types/Filter';
import { useFilter } from '../FilterContext';

export const Filter: React.FC = () => {
  const { setFilter } = useFilter();

  const [activeStyle, setActiveStyle] = useState(FilterType.All);

  const handleFilterLink = (style: FilterType) => {
    setActiveStyle(style);
    setFilter(style);
  };

  const filterKey = Object.keys(FilterType);

  return (
    <nav className="filter" data-cy="Filter">
      {filterKey.map((style, index) => (
        <a
          key={index}
          href="#/"
          className={classNames('filter__link', {
            selected:
              activeStyle === FilterType[style as keyof typeof FilterType],
          })}
          data-cy={`FilterLink${style}`}
          onClick={() =>
            handleFilterLink(FilterType[style as keyof typeof FilterType])
          }
        >
          {style}
        </a>
      ))}
    </nav>
  );
};
