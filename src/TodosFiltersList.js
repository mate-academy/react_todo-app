import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import TodoFilter from './TodoFilter';

const FILTERS = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

class TodosFiltersList extends React.Component {
  state = {
    selectedFilter: 'All',
  };

  selectFilter = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
  };

  render() {
    return (
      <ul className={cn('filters')}>
        {Object.values(FILTERS).map(value => (
          <TodoFilter
            key={value}
            filter={value}
            setFilter={this.props.setFilter}
            selectFilter={this.selectFilter}
            isFilterSelect={value === this.state.selectedFilter}
          />
        ))}
      </ul>
    );
  }
}

TodosFiltersList.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default TodosFiltersList;
