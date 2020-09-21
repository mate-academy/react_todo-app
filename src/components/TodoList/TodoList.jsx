import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  todos,
  setTodos,
  removeTodo,
  changeTodo,
}) => {
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
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleToDo={onToggleToDo}
          removeTodo={removeTodo}
          changeTodo={changeTodo}
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
  removeTodo: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired,
};
