import React from 'react';
import PropTypes from 'prop-types';
import { Todo, todoTypes } from '../Todo/Todo';

const TodoList = ({
  todos,
  deleteTodo,
  changeStatusTodo,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
        changeStatusTodo={changeStatusTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(todoTypes).isRequired,
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeStatusTodo: PropTypes.func.isRequired,
};

export default TodoList;
