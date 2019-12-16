import React from 'react';
import PropsTypes from 'prop-types';

class InputTodo extends React.Component {
  state = {
    newTodo: '',
  }

  enterValue = (event) => {
    event.preventDefault();

    if (this.state.newTodo !== '') {
      this.props.handleTodo(this.state.newTodo);
      this.setState({ newTodo: '' });
    }
  }

  handleBlur = (event) => {
    if (event.target.value !== '') {
      this.props.handleTodo(event.target.value);
      this.setState({ newTodo: '' });
    }
  }

  render() {
    return (
      <form onSubmit={this.enterValue}>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onChange={event => (
              this.setState({
                newTodo: event.target.value,
              })
            )}
            onBlur={this.handleBlur}
          />
        </header>
      </form>
    );
  }
}

InputTodo.propTypes = { handleTodo: PropsTypes.func.isRequired };

export default InputTodo;
