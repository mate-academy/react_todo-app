import React from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

export class NewTodo extends React.Component {
  state = {
    title: '',
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft(),
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { addTodo } = this.props;
    const { title } = this.state;

    if (title) {
      addTodo({
        title: title.trim(),
        id: uuid(),
        completed: false,
      });
    }

    this.setState({
      title: '',
    });
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="title"
          value={title}
          onChange={this.onChange}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
