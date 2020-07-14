import React from 'react';
import { PropTypes } from 'prop-types';
import { TodoItem } from './TodoItem/TodoItem';
// import cn from 'classnames';

export const TodosList = (props) => {
  const {
    todos,
    filter,
    onStatus,
    onRemove,
  } = props;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onStatus={onStatus}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  onStatus: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
