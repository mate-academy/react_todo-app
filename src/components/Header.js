import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    newTodo: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { newTodo } = this.state;

    if (event.key === 'Enter' && newTodo !== '') {
      this.props.onSubmit(newTodo);

      this.setState({
        newTodo: '',
      });
    }
  }

  render() {
    const { newTodo } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name="newTodo"
          value={newTodo}
          onChange={this.handleChange}
          onKeyUp={this.handleSubmit}
        />
      </header>
    );
  }
}

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Header;
