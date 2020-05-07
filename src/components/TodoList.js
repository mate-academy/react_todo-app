import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleCompleted, onDeleted }) => {
  const elements = todos.map(({ id, label, completed }) => (
    <TodoItem
      key={id}
      id={id}
      title={label}
      completed={completed}
      onToggleCompleted={() => onToggleCompleted(id)}
      onDeleted={() => onDeleted(id)}
    />
  ));

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  })),
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [{
    completed: false,
  }],
};

export default TodoList;
