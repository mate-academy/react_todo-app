import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = { valueTitle: '' }

  inputChangeHandler = (event) => {
    this.setState({
      valueTitle: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (!prevState.valueTitle) {
        return prevState.valueTitle;
      }

      this.props.addTodo({
        id: Date.now(),
        title: prevState.valueTitle,
        completed: false,
        editable: false,
      });

      return { valueTitle: '' };
    });
  };

  render() {
    const { valueTitle } = this.state;

    return (
      <header className="header">
        <form onSubmit={this.submitHandler}>
          <h1>todos</h1>

          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={valueTitle}
            onChange={this.inputChangeHandler}
          />
        </form>
      </header>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
export default NewTodo;
