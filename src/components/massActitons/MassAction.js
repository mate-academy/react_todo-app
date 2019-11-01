import React, { Component } from 'react';

class MassAction extends Component {
  render() {
    return (
      <label onClick={this.props.action}>Mark all as complete</label>
    );
  }
}

export default MassAction;
