import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    title: '',
  }

  handleSubmit = (event) => {
    const { addNewTodo } = this.props;

    event.preventDefault();

    addNewTodo({
      title: this.state.title,
      completed: false,
      id: Date.now(),
    });

    this.setState({
      title: '',
    });
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            value={this.state.title}
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
