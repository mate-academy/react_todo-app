import React from 'react';
import PropsTypes from 'prop-types';

class Filters extends React.Component {
  filterType = ['All', 'Active', 'Completed'];

  state = {
    selectFilter: this.filterType[0],
  }

  handleClick = (event) => {
    this.setState({
      selectFilter: event.target.textContent,
    });
    this.props.handleFilter(event.target.textContent);
  }

  render() {
    const { selectFilter } = this.state;

    return (
      this.filterType.map(filter => (
        <li key={filter}>
          <a
            href="#/"
            className={selectFilter === filter
              ? 'selected'
              : ''}
            onClick={this.handleClick}
          >
            {filter}
          </a>
        </li>
      ))
    );
  }
}

Filters.propTypes = {
  handleFilter: PropsTypes.func.isRequired,
};

export default Filters;
