import React from 'react';
import { NewTodoPropTypes } from '../../constants/proptypes';

class NewTodo extends React.Component {
  state = {
    title: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;

    if (title) {
      this.props.onAdd(title);

      this.setState({
        title: '',
      });
    }
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      title: value.replace(/^\s+/, ''),
    });
  };

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

NewTodo.propTypes = NewTodoPropTypes;

export default NewTodo;
