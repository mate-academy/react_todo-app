import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.PureComponent {
  state = {
    todoTitle: '',
    itemID: 0,
  }

  handleSumbit = (event) => {
    event.preventDefault();
    this.generateID();
    this.props.newItem({
      title: this.state.todoTitle,
      id: this.state.itemID,
      completed: false,
    });

    this.handleReset();
  }

  handleReset = () => {
    this.setState({ todoTitle: '' });
  }

  handleChange = (event) => {
    this.setState({ todoTitle: event.target.value });
  }

  generateID = () => {
    this.setState(() => ({
      itemID: Math.round(Math.random() * 1000000000000),
    }));
  }

  render() {
    return (
      <form onSubmit={this.handleSumbit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          value={this.state.todoTitle}
        />
      </form>
    );
  }
}

export default TodoItem;

TodoItem.propTypes = {
  newItem: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
