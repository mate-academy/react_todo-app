import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ToggleAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedAll: false,
    };
  }

  render() {
    return (
      <>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={this.state.checked}
          onChange={() => {
            this.props.handleToggleAll(this.state.completedAll);
            this.setState(prevState => ({
              completedAll: !prevState.completedAll,
            }));
          }
          }
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="toggle-all">Mark all as complete</label>
      </>
    );
  }
}

ToggleAll.defaultProps = {
  handleToggleAll: {},
};

ToggleAll.propTypes = {
  handleToggleAll: PropTypes.func,
};

export default ToggleAll;
