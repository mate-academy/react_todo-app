import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';
import { FILTERS } from '../constants';

export const TodoList = (
  { todos,
    setTodos,
    filter },
) => {
  const statusToogler = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo,
          completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const editTodosTitle = (todoId, title) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, title };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  return (
    <ul className="todo-list">
      {todos && todos.filter((todo) => {
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
            statusToogler={statusToogler}
            editTodosTitle={editTodosTitle}
          />
        ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setTodos: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
