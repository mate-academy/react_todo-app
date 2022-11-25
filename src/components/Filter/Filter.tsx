import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

enum FilterLink {
  All = 'FilterLinkAll',
  Active = 'FilterLinkActive',
  Completed = 'FilterLinkCompleted',
}

export const Filter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeButton = searchParams.get('showTodos');

  return (
    <nav className="filter" data-cy="Filter">
      <SearchLink
        data-cy={FilterLink.All}
        params={{ showTodos: null }}
        className={classNames(
          'filter__link',
          {
            selected: !activeButton,
          },
        )}
      >
        All
      </SearchLink>

      <SearchLink
        data-cy={FilterLink.Active}
        params={{ showTodos: 'active' }}
        className={classNames(
          'filter__link',
          {
            selected: activeButton === 'active',
          },
        )}
      >
        Active
      </SearchLink>

      <SearchLink
        data-cy={FilterLink.Completed}
        params={{ showTodos: 'completed' }}
        className={classNames(
          'filter__link',
          {
            selected: activeButton === 'completed',
          },
        )}
      >
        Completed
      </SearchLink>
    </nav>
  );
};
