import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

class TodoList extends React.PureComponent {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map(todoItem => (
          <TodoItem
            todo={todoItem}
            completed={this.props.completed}
            deleteItem={this.props.deleteItem}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;

TodoList.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
