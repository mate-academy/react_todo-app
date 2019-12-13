import React from 'react';
import PropTypes from 'prop-types';

class TodoHeader extends React.Component {
  state = { titleInput: '' };

  handleInputChange = (event) => {
    this.setState({
      titleInput: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(({ titleInput }) => {
      if (!titleInput.replace(/^\s+/, '')) {
        return { titleInput };
      }

      const { addTodo } = this.props;

      addTodo({
        id: +new Date(),
        title: titleInput,
        completed: false,
      });

      return { titleInput: '' };
    });
  };

  render() {
    const { titleInput } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            type="text"
            value={titleInput}
            placeholder="What needs to be done?"
            maxLength={30}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

TodoHeader.propTypes = { addTodo: PropTypes.func.isRequired };

export default TodoHeader;
