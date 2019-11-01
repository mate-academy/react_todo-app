import React, { Component } from 'react';

class ClearCompleted extends Component {
  render() {
    return (
        <button className="clear-completed"  type="button" style={this.props.isVisible ? {display: 'block'} : {display: 'none'} } onClick={this.props.deleteCompleted}>Clear completed</button>
    );
  }
}

export default ClearCompleted;
