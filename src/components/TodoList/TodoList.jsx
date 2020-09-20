import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, setTodos }) => {
  const onToggleToDo = (event, todoId) => {
    setTodos(
      prevTodos => prevTodos.map(todo => (todo.id === todoId
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo)),
    );
  };

  return (
    <ul className="todo-list">
      {/* { console.log(todos)} */}
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleToDo={onToggleToDo}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(shape({
    id: PropTypes.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  setTodos: PropTypes.func.isRequired,
};
