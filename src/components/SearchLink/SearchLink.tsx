import { FC } from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchParams } from '../../types/searchParams';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink: FC<Props> = ({
  params, children, ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
