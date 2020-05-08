import React from 'react';
import cn from 'classnames/bind';
import PropTypes from 'prop-types';

class Todo extends React.Component {
  state = {
    value: this.props.title,
    isClicked: false,
  }

  myRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isClicked !== prevState.isClicked) {
      this.myRef.current.focus();
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
    }));
  }

  editTitle = ({ target }) => {
    this.setState({
      value: target.value,
    });
  }

  render() {
    const {
      id,
      title,
      completed,
      onSelected,
      deleteTodo,
      saveChangesTodo,
    } = this.props;

    const { isClicked } = this.state;

    return (
      <li className={cn({ completed }, { editing: isClicked })}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={completed}
            onChange={onSelected}
          />
          <label
            htmlFor={id}
            onDoubleClick={this.handleClick}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={deleteTodo}
          />
        </div>
        <input
          type="text"
          className="edit"
          onBlur={this.handleClick}
          value={this.state.value}
          ref={this.myRef}
          onChange={this.editTitle}
          onKeyPress={saveChangesTodo}
        />
      </li>
    );
  }
}

Todo.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onSelected: PropTypes.func,
  deleteTodo: PropTypes.func,
  saveChangesTodo: PropTypes.func,
};

Todo.defaultProps = {
  onSelected: null,
  deleteTodo: null,
  saveChangesTodo: () => {},
};

export default Todo;
