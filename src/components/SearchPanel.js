import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };
  }

  onChange = (event) => {
    const { onSearch } = this.props;
    this.setState({
      term: event.target.value,
    });

    onSearch(event.target.value);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        value={this.state.term}
        onChange={this.onChange}
      />
    );
  }
}

SearchPanel.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
