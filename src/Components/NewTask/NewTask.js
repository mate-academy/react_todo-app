import React from 'react';
import PropTypes from 'prop-types';

class TodoApp extends React.Component {
  state = {
    inputData: '',
  }

  handleChange = (event) => {
    this.setState({
      inputData: event.target.value,
    });
  }

  clearField = () => {
    this.setState({ inputData: '' });
  };

  render() {
    const { inputData } = this.state;
    const { handleSubmit } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          const taskObj = {
            id: +new Date(),
            title: inputData.trim(),
            completed: false,
          };

          if (inputData.length === 0) {
            return;
          }

          handleSubmit(taskObj);
          this.clearField();
        }}
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputData}
            onChange={this.handleChange}
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
