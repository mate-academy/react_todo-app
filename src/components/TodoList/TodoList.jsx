import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos, setTodos }) => {
  const handleStatus = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const changeTodo = (id, title) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return { ...todo, title };
    }));
  };

  return (
    <ul className="todo-list">
      {todos.map(item => (
        <TodoItem
          todo={item}
          key={item.id}
          handleStatus={handleStatus}
          deleteTodo={deleteTodo}
          changeTodo={changeTodo}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
};
