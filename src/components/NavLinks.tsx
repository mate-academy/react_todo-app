import classNames from 'classnames';
import { ActiveLink } from '../types/ActiveLink';
import { useContext } from 'react';
import { ActiveLinkContext } from '../context/ActiveLinkContext';

export const NavLinks = () => {
  const { activeLink, setActiveLink } = useContext(ActiveLinkContext);

  return (
    <nav className="filter" data-cy="Filter">
      {(Object.keys(ActiveLink) as Array<keyof typeof ActiveLink>).map(link => {
        const linkValue = ActiveLink[link];

        return (
          <a
            key={link}
            href="#/"
            className={classNames('filter__link', {
              selected: activeLink === linkValue,
            })}
            data-cy={`FilterLink${link}`}
            onClick={() => {
              setActiveLink(linkValue);
            }}
          >
            {link}
          </a>
        );
      })}
    </nav>
  );
};
