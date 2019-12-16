import React from 'react';
import PropTypes from 'prop-types';
import Filters from './filters';

class Footer extends React.Component {
  state = {
    filters: [
      {
        title: `All`,
        href: `#/`,
        id: 1,
      },
      {
        title: `Active`,
        href: `#/active`,
        id: 2,
      },
      {
        title: `Completed`,
        href: `#/completed`,
        id: 3,
      },
    ],
  };

  render() {
    const { filters } = this.state;
    const { list } = this.props;

    return (
      <Filters filters={filters} list={list} />
    );
  }
}

Footer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

Footer.defaultProps = {
  list: [],
};

export default Footer;
