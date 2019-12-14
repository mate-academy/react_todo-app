import React from 'react';
import PropTypes from 'prop-types';

class TodoEdit extends React.Component {
  state = {
    editValue: this.props.title,
  }

  componentDidMount() {
    document.querySelector('.edit').focus();
    document.addEventListener('click', this.cancelEditing);
    document.addEventListener('keyup', this.cancelEditing);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.cancelEditing);
    document.removeEventListener('keyup', this.cancelEditing);
  }

  cancelEditing = (event) => {
    if (event.type === 'keyup' && event.key === 'Escape') {
      this.props.turnOffEditing();
    } else if (event.type === 'click'
      && event.target !== document.querySelector('.edit')) {
      this.props.fixTodo(this.state.editValue, this.props.id);
      this.props.turnOffEditing();
    }
  }

  render() {
    return (
      <form
        onSubmit={() => {
          this.props.fixTodo(this.state.editValue, this.props.id);
          this.setState({
            editValue: '',
          });
          this.props.turnOffEditing();
        }}
      >
        <input
          className="edit"
          value={this.state.editValue}
          onChange={event => this.setState({ editValue: event.target.value })}
        />
      </form>
    );
  }
}

TodoEdit.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  fixTodo: PropTypes.func.isRequired,
  turnOffEditing: PropTypes.func.isRequired,
};

export default TodoEdit;
