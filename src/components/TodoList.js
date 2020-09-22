import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';
import { FILTERS } from '../constants';

export const TodoList = (
  { todos,
    setTodos,
    filter },
) => {
  const editTodo = (todoId, value) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo,
          title: typeof value === 'string' ? value : todo.title,
          completed: typeof value === 'boolean' ? value : todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  if (!todos) {
    return null;
  }

  return (
    <ul className="todo-list">
      {todos.filter((todo) => {
        switch (filter) {
          case (FILTERS.active):
            return !todo.completed;
          case (FILTERS.completed):
            return todo.completed;
          default:
            return todo;
        }
      })
        .map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired),
  setTodos: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

TodoList.defaultProps = {
  todos: null,
};
