import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class Nav extends React.Component {
  state = {};

  render() {
    const {
      handleSelectComplited,
      handleSelectAll,
      handleSelectActive,
      activePage,
    } = this.props;

    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cs({ selected: activePage === 'All' })}

            onClick={() => handleSelectAll()}
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={() => handleSelectActive()}
            href="#/active"
            className={cs({ selected: activePage === 'Active' })}

          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={() => handleSelectComplited()}
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
  handleSelectComplited: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  handleSelectActive: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
};

export default Nav;
