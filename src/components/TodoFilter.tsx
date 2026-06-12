type FilterType = 'all' | 'active' | 'completed';

type Props = {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
};

const FILTERS = [
  { type: 'all', label: 'All', href: '#/', dataCy: 'FilterLinkAll' },
  {
    type: 'active',
    label: 'Active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    type: 'completed',
    label: 'Completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
] as const;

export const TodoFilter = ({ filter, onChange }: Props) => (
  <nav className="filter" data-cy="Filter">
    {FILTERS.map(({ type, label, href, dataCy }) => (
      <a
        key={type}
        href={href}
        className={`filter__link ${filter === type ? 'selected' : ''}`}
        data-cy={dataCy}
        onClick={() => onChange(type)}
      >
        {label}
      </a>
    ))}
  </nav>
);
