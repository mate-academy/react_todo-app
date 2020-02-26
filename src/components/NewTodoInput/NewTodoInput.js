import React from 'react';
import PropTypes from 'prop-types';

export class NewTodoInput extends React.Component {
  state = {
    inputValue: '',
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { inputValue } = this.state;
    const { todos } = this.props;

    const newTask = {
      title: inputValue,
      id: todos[todos.length - 1].id + 1,
      completed: false,
      editing: false,
    };

    this.props.onAdd(newTask);
    this.resetState();
  }

  resetState = () => {
    this.setState({
      inputValue: '',
    });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          value={inputValue}
        />
      </form>
    );
  }
}

NewTodoInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  })).isRequired,
};
