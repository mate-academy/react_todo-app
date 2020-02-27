import React from 'react';
import PropTypes from 'prop-types';

export class TodoApp extends React.Component {
  state = {
    title: '',
    id: 1,
    completed: false,
    edit: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;
    const { addTodo } = this.props;

    if (title !== '') {
      addTodo(this.state);
    }

    this.setState(prevState => ({
      title: '',
      id: prevState.id + 1,
    }));
  };

  handleInput = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value.replace(/\s/g, ''),
    });
  };

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleInput}
          value={title}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

TodoApp.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
