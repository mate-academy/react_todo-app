import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export function TodoList({ todos, onSwitchTodos, onDelete, onEditTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onSwitchTodos={onSwitchTodos}
          onDelete={onDelete}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onSwitchTodos: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};
