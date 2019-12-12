import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList({ todos, changeTodoStatus, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(item => (
        <TodoItem
          todo={item}
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
