import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  link: string,
  title: string,
};

export const TodoFilter:React.FC<Props> = ({
  link,
  title,
}) => {
  const { pathname } = useLocation();

  return (
    <li>
      <Link
        to={link}
        className={pathname === link ? 'selected' : ''}
      >
        {title}
      </Link>
    </li>
  );
};
