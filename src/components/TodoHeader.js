import React from 'react';
import PropTypes from 'prop-types';

class TodoHeader extends React.Component {
  state = {
    todoToAdd: '',
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            if (this.state.todoToAdd.trim()) {
              event.preventDefault();
              this.props.addNewTodo(this.state.todoToAdd);
              this.setState({ todoToAdd: '' });
            }
          }}
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.todoToAdd}
            onChange={event => this.setState({
              todoToAdd: event.target.value,
            })}
          />
        </form>
      </header>
    );
  }
}

TodoHeader.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};

export default TodoHeader;
