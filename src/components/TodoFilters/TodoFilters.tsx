import { Status } from '../../types/Status';
import { PageNavLink } from '../PageNavLink/PageNavLink';

const filterLinks = Object.values(Status);

export const TodoFilters: React.FC = () => {
  return (
    <ul className="filters">
      {filterLinks.map(link => (
        <li key={link}>
          <PageNavLink to={`/${link}`} text={link} />
        </li>
      ))}
    </ul>
  );
};
