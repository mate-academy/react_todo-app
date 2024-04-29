import { FC, useState } from 'react';
import { FilterLink } from '../../types/types';
import classNames from 'classnames';

interface IProps {
  items: FilterLink[];
  onFilter?: (filter: string) => void;
}

export const FooterFilter: FC<IProps> = ({ items, onFilter = () => {} }) => {
  const [selectedItem, setSelectedItem] = useState<string>('All');

  const handleFilter = (filter: string) => {
    setSelectedItem(filter);
    onFilter(filter);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {items.map(item => (
        <a
          key={item.dataCy}
          href={item.href}
          className={classNames('filter__link', {
            selected: selectedItem === item.title,
          })}
          data-cy={item.dataCy}
          onClick={() => {
            handleFilter(item.title);
          }}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
};
