import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state= {
    id: 1,
    title: '',
    completed: '',
  }

  handleInput = (event) => {
    const { value } = event.target;

    this.setState({
      title: value.trimLeft().replace(/(\s{2,})/, ' '),
      completed: false,
    });
  }

  sumbmitForm = (event) => {
    const { addTodo } = this.props;
    const { id, title, completed } = this.state;

    event.preventDefault();
    if (this.state.title === '') {
      return;
    }

    addTodo({
      id,
      title,
      completed,
    });
    this.reset();
  }

  reset = () => {
    this.setState(prev => ({
      title: '',
      completed: false,
      id: prev.id + 1,
    }));
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.sumbmitForm}>
          <input
            onChange={this.handleInput}
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.title}
          />
        </form>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
