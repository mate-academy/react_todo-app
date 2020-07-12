import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    title: '',
  }

  onEnterKey = (event) => {
    const { onAdd } = this.props;
    const { title } = this.state;

    if (event.keyCode === 13 && title) {
      onAdd({
        title,
        isCompleted: false,
      });
      this.setState({
        title: '',
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      title: target.value.replace(/\s/, ' ').trimLeft(),
    });
  }

  render() {
    const { title } = this.state;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onKeyUp={this.onEnterKey}
        onChange={this.handleChange}
      />
    );
  }
}

NewTodo.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
