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
    const { title } = this.state;
    const { todoId } = this.props;

    event.preventDefault();

    if (title.length === 0) {
      return;
    }

    this.props.addTodo({
      ...this.state,
      id: todoId + 1,
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
  addTodo: PropTypes.func.isRequired,
  todoId: PropTypes.number.isRequired,
};

export default Header;
