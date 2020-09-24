import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos, filtredTodos, setTodos }) => {
  const handleDelete = (id) => {
    setTodos(filtredTodos.filter(todo => todo.id !== id));
  };

  const changeTodoTitle = (id, title) => {
    setTodos(filtredTodos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        title,
      };
    }));
  };

  const todosToggler = (id) => {
    const changedTodos = todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    });

    setTodos(changedTodos);
  };

  return (
    <ul className="todo-list">
      {filtredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          changeTodoTitle={changeTodoTitle}
          todosToggler={todosToggler}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  filtredTodos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
};
