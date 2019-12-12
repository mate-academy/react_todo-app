import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    title: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title } = this.state;

    if (title.length < 1) {
      return;
    }

    this.props.onSubmit({
      id: Date.now(),
      title,
      completed: false,
    });

    this.setState({
      title: '',
    });
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <header className="header">
          <h1>todos</h1>

          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            value={this.state.title}
            name="title"
            autoComplete="off"
          />
        </header>
      </form>
    );
  }
}

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Header;
