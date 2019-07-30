import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  state = {
    id: this.props.todo.id,
    editable: false,
    newTitle: this.props.todo.title,
  }

  changeItem = () => {
    this.setState({
      editable: true,
    });
  }

  handleBlur = (event) => {
    this.setState({
      editable: false,
      newTitle: event.target.value,
    }, () => this.props.handleSubmit(this.props.todo.id, this.state.newTitle));
  }

  handleChange = (event) => {
    this.setState({ newTitle: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      editable: false,
    }, () => this.props.handleSubmit(this.state.id, this.state.newTitle));
  }

  render() {
    return (
      <li className={this.props.todo.completed ? 'completed' : ''}>
        {
          this.state.editable && (
            <form className="edit-table" onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.newTitle}
                className="edit"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                autoFocus
              />
            </form>
          )
        }
        <div className="view" onDoubleClick={event => this.changeItem(event)}>
          <input
            type="checkbox"
            className="toggle editing"
            id={this.props.todo.id}
            checked={this.props.todo.completed}
            onChange={() => this.props.handleToggle(this.props.todo.id)}
          />
          <label>
            {this.props.todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => this.props.handleRemove(this.props.todo.id)}
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default TodoItem;
