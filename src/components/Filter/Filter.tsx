import { useContext } from 'react';
import { FilterStatus, TodoContext } from '../Context/TodoContext';

const filters: { label: string; value: FilterStatus; dataCy: string }[] = [
  { label: 'All', value: 'all', dataCy: 'FilterLinkAll' },
  { label: 'Active', value: 'active', dataCy: 'FilterLinkActive' },
  { label: 'Completed', value: 'completed', dataCy: 'FilterLinkCompleted' },
];

export const Filter = () => {
  const context = useContext(TodoContext);

  if (!context) {
    return null;
  }

  const { filter } = context.state;
  const { dispatch } = context;

  return (
    <nav className="filter" data-cy="Filter">
      {filters.map(item => (
        <a
          key={item.value}
          href={`#/${item.value === 'all' ? '' : item.value}`}
          className={`filter__link ${filter === item.value ? 'selected' : ''}`}
          data-cy={item.dataCy}
          onClick={event => {
            event.preventDefault();
            dispatch({ type: 'setFilter', payload: item.value });
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};
