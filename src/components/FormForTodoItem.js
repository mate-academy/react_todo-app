import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormForTodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
    };
    this.refField = React.createRef();
    this.changeTitle = this.changeTitle.bind(this);
    this.submitTitle = this.submitTitle.bind(this);
  }

  componentDidMount() {
    this.refField.current.focus();
  }

  changeTitle(action) {
    this.setState({ title: action.target.value });
  }

  submitTitle(action) {
    action.preventDefault();
    this.props.ChangeTitle(this.state.title);
  }

  render() {
    return (
      <form onSubmit={this.submitTitle}>
        <input
          type="text"
          value={this.state.title}
          onChange={this.changeTitle}
          className="edit"
          ref={this.refField}
          onBlur={this.submitTitle}
        />
      </form>
    );
  }
}

FormForTodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  ChangeTitle: PropTypes.func.isRequired,
};

export default FormForTodoItem;
