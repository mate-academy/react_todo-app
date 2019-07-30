import React from 'react';
import PropTypes from 'prop-types';

class FilterBtns extends React.Component {
  state = {
    sort: 1,
  }

  filterBtn = (id, filteredBy) => {
    this.setState({
      sort: id,
    });

    this.props.handleFilter(filteredBy);
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={this.state.sort === 1 && 'selected'}
            onClick={() => this.filterBtn(1, 'All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={this.state.sort === 2 && 'selected'}
            onClick={() => this.filterBtn(2, 'Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={this.state.sort === 3 && 'selected'}
            onClick={() => this.filterBtn(3, 'Completed')}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

FilterBtns.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default FilterBtns;
