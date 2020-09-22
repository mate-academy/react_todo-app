import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = (
  { setTodos,
    todos },
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
      {todos
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
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object.isRequired),
};
TodoList.defaultProps = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired),
};
