import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string,
  title: string,
};

export const FilterNavLink: React.FC<Props> = ({
  to,
  title,
}) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => cn({ selected: isActive })}
      >
        {title}
      </NavLink>
    </li>
  );
};
