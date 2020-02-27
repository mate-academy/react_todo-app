import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectAll.css';

export class SelectAll extends Component {
  state = {
    isChecked: false,
  };

handleChange = (event) => {
  const { checked } = event.target;

  this.setState({
    isChecked: checked,
  });
  this.props.selectAll(checked);
};

render() {
  const { isChecked } = this.state;

  return (
    <>
      <input
        value={this.state.checked}
        onChange={this.handleChange}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
      />
      <label htmlFor="toggle-all">
        { isChecked
          ? <span className="tooltip">Mark all as not complete</span>
          : <span className="tooltip">Mark all as complete</span>
        }
      </label>
    </>
  );
}
}

SelectAll.propTypes = {
  selectAll: PropTypes.func.isRequired,
};
