import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = ({ todos, setTodos, filterValue, onTodoChange }) => {
  let todosToRender;

  switch (filterValue) {
    case 'Active':
      todosToRender = todos.filter(todo => !todo.completed);
      break;
    case 'Completed':
      todosToRender = todos.filter(todo => todo.completed);
      break;
    default:
      todosToRender = todos;
  }

  const handleCompletedChange = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return { ...todo };
    }));
  };

  const handleTodoDeletion = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul className="todo-list">
      {todosToRender.map(todo => (
        <Todo
          onCompletedChange={handleCompletedChange}
          onTodoDeletion={handleTodoDeletion}
          setTodos={setTodos}
          onTodoChange={onTodoChange}
          key={todo.id}
          {...todo}
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
  filterValue: PropTypes.string.isRequired,
  onTodoChange: PropTypes.func.isRequired,
};
