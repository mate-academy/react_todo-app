import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar__container">
        <NavLink
          to="/"
          className="navbar__item"
        >
          <img
            className="navIcon"
            src="https://svgsilh.com/svg_v2/2088906.svg"
            alt="home"
          />
        </NavLink>

        <NavLink
          to="/local"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          Local Todos
        </NavLink>

        <NavLink
          to="/cloud"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          Cloud Todos
        </NavLink>
      </div>
    </nav>
  );
};
