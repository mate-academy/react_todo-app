import React from 'react';
import PropsTypes from 'prop-types';

class InputTodo extends React.Component {
  state = {
    newTodo: '',
  }

  enterValue = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.props.handleTodo(event.target.value);
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
      <>
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
            onKeyDown={this.enterValue}
            onBlur={this.handleBlur}
          />
        </header>
      </>
    );
  }
}

InputTodo.propTypes = { handleTodo: PropsTypes.func.isRequired };

export default InputTodo;
