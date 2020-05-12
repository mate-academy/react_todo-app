import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  //state = this.state;
  state = {
    // title: '',
    // id: 0,
  }

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    })
  };

  handleInputChange = ({ target }) => {
    this.setState({
      title: target.value,
    });
  }

  handleReset = () => {
    this.setState({
      title: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addTodoItem } = this.props;
    const { title } = this.state;

    if (title.trim()) {
      const newTodo = {
        title: title.trim(),
        id: +(new Date()),
        comleted: false,
      };
      addTodoItem(newTodo);
    }
    this.handleReset();
  }

  render() {
    const { title } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    )
  };
};

export default Header;

Header.propTypes = {
  addTodoItem: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
