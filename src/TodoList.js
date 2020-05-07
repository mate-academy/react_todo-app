import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

class TodoList extends React.Component {
  state={
    isToggleOn: true,
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));

    this.props.onAllSelected(this.state.isToggleOn);
  }

  render() {
    const { todos, onTodoSelected } = this.props;

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={this.props.comletedStatus}
          value={this.state.isToggleOn}
          onChange={this.handleClick}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos.map(todo => (
            <Todo
              {...todo}
              key={todo.id}
              onSelected={() => onTodoSelected(todo.id)}
            />
          ))}
        </ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  comletedStatus: PropTypes.bool.isRequired,
  onAllSelected: PropTypes.func.isRequired,
  onTodoSelected: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};

export default TodoList;
