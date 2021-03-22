import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

export function TodoList({
  todos,
  onAddChecked,
  onRemoveTodo,
  onEditTitle,
}) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onAddChecked={onAddChecked}
          onRemoveTodo={onRemoveTodo}
          onEditTitle={onEditTitle}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  onAddChecked: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
