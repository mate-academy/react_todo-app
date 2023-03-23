import { Status } from '../../types/Status';
import { getLinkText } from '../../utils/helper';
import { PageNavLink } from '../PageNavLink/PageNavLink';

const filterLinks = Object.values(Status);

export const TodoFilters: React.FC = () => {
  return (
    <ul className="filters">
      {filterLinks.map(link => (
        <li key={link}>
          <PageNavLink to={`/${link}`} text={getLinkText(link)} />
        </li>
      ))}
    </ul>
  );
};
