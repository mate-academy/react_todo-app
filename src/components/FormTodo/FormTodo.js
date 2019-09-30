import React from 'react';
import PropTypes from 'prop-types';

class FormTodo extends React.Component {
  state = {
    title: '',
    id: 1,
  };

  handleClick = (event) => {
    event.preventDefault();
    if (event.target.text.value.length === 0) {
      return false;
    }

    const { addTodo } = this.props;
    const { title, id } = this.state;
    const newTodo = {
      title,
      completed: false,
      id,
    };

    this.setState(prevState => ({ title: '', id: prevState.id + 1 }));

    addTodo(newTodo);
  };

  handleChange = ({ target }) => {
    this.setState({ title: target.value });
  };

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleClick}>
        <input
          className="new-todo"
          name="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={this.handleChange}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    );
  }
}

FormTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default FormTodo;
