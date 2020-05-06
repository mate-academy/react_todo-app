import React from 'react';
import PropTypes from 'prop-types';

class TodoApp extends React.Component {
  state = {
    text: '',
  }

  handleChangeNewTodoText = (event) => {
    const { value } = event.target;

    this.setState({ text: value });
  }

  render() {
    const { handleSubmit } = this.props;
    const { text } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={(event) => {
          handleSubmit(event, text);

          this.setState({ text: '' });
        }
        }
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={text}
            onChange={this.handleChangeNewTodoText}
            onBlur={(event) => {
              handleSubmit(event, text);

              this.setState({ text: '' });
            }
            }
          />
        </form>
      </header>
    );
  }
}

TodoApp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default TodoApp;
