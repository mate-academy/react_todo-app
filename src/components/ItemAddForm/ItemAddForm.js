import React, { Component } from 'react';

class ItemAddForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value.replace(/^\s+/, ''),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form
        className="item-add-form d-flex"
        onSubmit={this.onSubmit}
      >
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done"
          value={this.state.label}
        />
      </form>
    );
  }
}

export default ItemAddForm;
