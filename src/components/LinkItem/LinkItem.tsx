import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  title: string;
};

export const LinkItem: React.FC<Props> = ({ to, title }) => {
  const location = useLocation().pathname;

  return (
    <Link
      to={to}
      className={classNames(
        'nav__link',
        { selected: location === to },
      )}
    >
      {title}
    </Link>
  );
};
