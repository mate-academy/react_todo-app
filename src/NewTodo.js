import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    title: '',
    id: 0,
    completed: false,

  }

  handleSetTitle = ({ target }) => {
    this.setState({
      title: target.value.trimLeft().replace(/[^a-zа-я\s]/gi, ''),
    });
  }

  resetForm = () => {
    this.setState(prevState => (
      {
        title: '',
        id: prevState.id + 1,
        completed: false,
      }
    ));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, id, completed } = this.state;
    const { addNewTodo } = this.props;

    if (!title.length) {
      this.setState({
        title: '',
      });

      return;
    }

    addNewTodo({
      title,
      id: id + 1,
      completed,

    });

    this.resetForm();
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleSetTitle}
          value={title}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};

export default NewTodo;
