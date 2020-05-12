import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    newItemText: '',
  }

  handleAddItem = (event) => {
    event.preventDefault();

    const { addItem } = this.props;
    const { newItemText } = this.state;

    addItem(newItemText);

    this.setState({
      newItemText: '',
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      newItemText: target.value,
    });
  }

  render() {
    const { newItemText } = this.state;

    return (
      <form onSubmit={this.handleAddItem}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={newItemText}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addItem: PropTypes.func.isRequired,
};
