type FilterType = 'all' | 'active' | 'completed';

type Props = {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
};

export const TodoFilter = ({ filter, onChange }: Props) => (
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
      data-cy="FilterLinkAll"
      onClick={() => onChange('all')}
    >
      All
    </a>

    <a
      href="#/active"
      className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
      data-cy="FilterLinkActive"
      onClick={() => onChange('active')}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
      data-cy="FilterLinkCompleted"
      onClick={() => onChange('completed')}
    >
      Completed
    </a>
  </nav>
);
