import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export function TodoList({ todos, onCheckedTodos, onDelete, onEditTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onCheckedTodos={onCheckedTodos}
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
  onCheckedTodos: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};
