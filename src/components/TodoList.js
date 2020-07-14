import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

export function TodoList({
  todos,
  onDeleted,
  onToggle,
}) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo.todo}
          completed={todo.completed}
          id={todo.id}
          key={todo.id}
          onDeleted={() => onDeleted(todo.id)}
          onToggle={() => onToggle(todo.id)}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};
