import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    title: '',
    error: '',
  }

  handleSubmit = (event) => {
    const { addNewTodo } = this.props;
    let { error } = this.state;

    event.preventDefault();

    this.setState((prevState) => {
      if (!prevState.title || prevState.title === ' ') {
        error = 'Todo is required';
      }

      if (error) {
        return error;
      }

      addNewTodo({
        title: prevState.title,
        completed: false,
        id: Date.now(),
      });

      return {};
    });

    this.setState({
      title: '',
    });
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value.replace(/[^\w ]/, '').replace(/\s+/g, ' '),
      error: '',
    });
  };

  render() {
    const { title } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            value={title}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};

export default Header;
