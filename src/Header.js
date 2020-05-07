import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state={
    title: '',
    id: '',
    completed: false,
  }

  handleTitle = ({ target }) => (
    this.setState({
      title: target.value.trim(),
    })
  )

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onTodo({
      ...this.state,
      id: +new Date(),
    });

    this.setState({
      title: '',
    });
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={this.handleTitle}
          />
        </header>
      </form>

    );
  }
}

Header.propTypes = {
  onTodo: PropTypes.func.isRequired,
};

export default Header;
