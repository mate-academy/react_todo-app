import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

class TodoList extends React.Component {
  state = {
    isToggleOn: true,
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));

    this.props.onAllSelected(this.state.isToggleOn);
  }

  render() {
    const { todos, onTodoSelected, deleteTodo } = this.props;

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={this.props.completedStatus}
          value={this.state.isToggleOn}
          onChange={this.handleClick}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos.map(todo => (
            <Todo
              {...todo}
              key={todo.id}
              onSelected={e => onTodoSelected(todo.id, e)}
              deleteTodo={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  completedStatus: PropTypes.bool.isRequired,
  onAllSelected: PropTypes.func.isRequired,
  onTodoSelected: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  deleteTodo: null,
};

export default TodoList;
