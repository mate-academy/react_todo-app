import React from 'react';
import PropTypes from 'prop-types';
import Tabs from './tabs';

class Footer extends React.Component {
  state = {
    tabs: [
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
    const { tabs } = this.state;
    const { list } = this.props;

    return (
      <Tabs tabs={tabs} list={list} />
    );
  }
}

Footer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

Footer.defaultProps = {
  list: [],
};

export default Footer;
