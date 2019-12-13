import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    newTodoTitle: '',
  };

  handleOnChange = ({ target: { value } }) => {
    this.setState(prevState => ({ newTodoTitle: value }));
  };

  toSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle } = this.state;
    const { addTodo } = this.props;

    addTodo(newTodoTitle);

    this.setState({
      newTodoTitle: '',
    });
  };

  render() {
    const { newTodoTitle } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.toSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={this.handleOnChange}
          />
        </form>
      </header>
    );
  }
}

NewTodo.propTypes = { addTodo: PropTypes.func.isRequired };

export default NewTodo;
