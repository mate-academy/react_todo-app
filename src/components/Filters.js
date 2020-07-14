import React from 'react';
import PropTypes from 'prop-types';

import { Filter } from './Filter';

const filterNames = ['All', 'Active', 'Completed'];

export class Filters extends React.Component {
  state = {
    activeButton: '',
  }

  handleActiveButton = (name) => {
    this.setState({
      activeButton: name,
    }, this.props.selectedFilter(name));
  }

  render() {
    const { activeButton } = this.state;

    return (
      <ul className="filters">
        {filterNames.map(name => (
          <Filter
            activeButton={activeButton}
            key={name}
            name={name}
            setAsSelected={() => this.handleActiveButton(name)}
          />
        ))}
      </ul>
    );
  }
}

Filters.propTypes = {
  selectedFilter: PropTypes.func.isRequired,
};
