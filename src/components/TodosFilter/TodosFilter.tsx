import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  link: string,
  title: string,
};

export const TodosFilter:React.FC<Props> = ({
  link,
  title,
}) => {
  const { pathname } = useLocation();

  return (
    <li className={pathname === link ? 'completed' : ''}>
      <Link
        to={link}
      >
        {title}
      </Link>
    </li>
  );
};
