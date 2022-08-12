import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchRequest, SearchParams } from './MagicHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams,
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchRequest(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
