import React from 'react';
import PropTypes from 'prop-types';

class TodoAdd extends React.Component {
  state = {
    newTodoTitle: '',
    titleError: false,
  };

  handleNewTodoTitleChange = (event) => {
    const { value } = event.target;

    this.setState({
      titleError: false,
      newTodoTitle: value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { newTodoTitle } = this.state;

    if (!newTodoTitle) {
      this.setState({
        titleError: !newTodoTitle,
      });

      return;
    }

    if (newTodoTitle.trim() === '') {
      this.setState({ titleError: true });

      return;
    }

    this.props.updateTodosList(newTodoTitle);
    this.clearState();
  }

  clearState = () => {
    this.setState({
      newTodoTitle: '',
    });
  };

  render() {
    const {
      newTodoTitle,
      titleError,
    } = this.state;

    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={this.handleNewTodoTitleChange}
            />
            {titleError}
          </form>
        </header>
      </>
    );
  }
}

TodoAdd.propTypes = {
  updateTodosList: PropTypes.func.isRequired,
};

export default TodoAdd;
