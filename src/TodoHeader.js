import React from 'react';
import PropTypes from 'prop-types';

class TodoHeader extends React.Component {
  state = {
    title: '',
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      title: value.replace(/^\s+/, ''),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;

    if (title) {
      this.props.addTodo(title);

      this.setState({
        title: '',
      });
    }
  };

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="main">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

TodoHeader.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoHeader;
