import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  type: Filter,
};

export const FooterLink: React.FC<Props> = ({
  type,
}) => {
  const path = useLocation();
  const currentFilter = path.pathname.slice(1);

  return (
    <Link
      to={type === Filter.all ? '/' : `/${type}`}
      className={classNames(
        'filter__link',
        { selected: currentFilter === type },
      )}
    >
      {type}
    </Link>
  );
};
