import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoType } from '../../types';

export const TodoList = ({
  todos,
  handleCompleteTodo,
  handleChangeTodo,
  handleDeleteTodo,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        handleCompleteTodo={handleCompleteTodo}
        handleChangeTodo={handleChangeTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType.isRequired),
  handleCompleteTodo: PropTypes.func.isRequired,
  handleChangeTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
