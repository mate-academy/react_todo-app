import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class Nav extends React.Component {
  state = {};

  render() {
    const {
      handleSelectActivePage,
      activePage,
    } = this.props;

    return (
      <ul className="filters">
        <li>
          <a
            onClick={() => handleSelectActivePage('All')}
            href="#/"
            className={cs({ selected: activePage === 'All' })}
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={() => handleSelectActivePage('Active')}
            href="#/active"
            className={cs({ selected: activePage === 'Active' })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={() => handleSelectActivePage('Completed')}
            href="#/completed"
            className={cs({ selected: activePage === 'Completed' })}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

Nav.propTypes = {
  handleSelectActivePage: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
};

export default Nav;
