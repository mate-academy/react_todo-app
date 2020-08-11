import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
  state = {};

  render() {
    const { todos, onCheckboxChange, onRemove, onEdit } = this.props;

    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            title={todo.title}
            id={todo.id}
            completed={todo.completed}
            key={todo.id}
            onCheckboxChange={onCheckboxChange}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
