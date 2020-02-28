import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = (props) => {
  const {
    filteredTodos,
    deleteTodo,
    checkTodo,
  } = props;

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={() => deleteTodo(todo.id)}
          checkTodo={() => checkTodo(todo.id)}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
};
