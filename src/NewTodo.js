import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    title: '',
    id: this.props.length,
    inputError: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, id } = this.state;
    const { addTodo } = this.props;

    if (title.trim() === '') {
      this.setState({
        inputError: true,
      });
    } else {
      addTodo({
        id: id + 1,
        title: title.trim(),
        completed: false,
      });
      this.setState(prevState => ({
        title: '',
        id: prevState.id + 1,
        inputError: false,
      }));
    }
  }

  onTitleChange = (event) => {
    if (event.target.value.trim() !== '') {
      this.setState({
        title: event.target.value,
        inputError: false,
      });
    } else {
      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { inputError, title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={title}
          onChange={this.onTitleChange}
          className={classNames('new-todo', { inputError })}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  length: PropTypes.number.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
