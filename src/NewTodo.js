import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    title: '',
    id: 0,
    // completed: false,
  }

  handleChangeTitle = ({ target }) => {
    this.setState({
      title: target.value.trimLeft().replace(/[^a-z\s]/gi, ''),
    });
  }

  resetForm = () => {
    this.setState(prevState => (
      {
        title: '',
        id: prevState.id + 1,
        // completed: false,
      }
    ));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, id } = this.state;

    this.props.newTodo({
      title,
      id: id + 1,

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
          onChange={this.handleChangeTitle}
          value={title}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  newTodo: PropTypes.func.isRequired,
};

export default NewTodo;
