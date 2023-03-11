import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  type: Filter,
};

export const FooterLink: React.FC<Props> = ({
  type,
}) => (
  <NavLink
    to={type === Filter.all ? '/' : `/${type}`}
    className={(isActive) => classNames(
      'filter__link',
      { selected: isActive },
    )}
  >
    {type}
  </NavLink>
);
