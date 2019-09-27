import React from 'react';

import shortid from 'shortid';
import { TodoFormTypes } from '../PropTypes/PropTypes';

class Form extends React.Component {
  state = {
    todoTitle: '',
    id: '', // eslint-disable-line
  }

  onEnterDown = (event) => {
    if (event.key === 'Enter') {
      if (this.state.todoTitle) {
        this.props.AddTodo({
          todoTitle: this.state.todoTitle,
          id: shortid.generate(),
          completed: false,
        });
        this.setState({ todoTitle: '' });
      }
    }
  }

  render() {
    const { todoTitle } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <input
          value={todoTitle}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={event => this.setState({ todoTitle: event.target.value })}
          onKeyDown={this.onEnterDown}
        />
      </header>
    );
  }
}

Form.propTypes = TodoFormTypes;

export default Form;
