import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';
import { TodoShape } from './TodoShape';

export const TodoList
= (
  { todos, handleCheck, handleDelete, saveEditedTodo },
) => (
  <ul className="todo-list">
    {
      todos.map(item => (
        <TodoItem
          key={item.id}
          todo={item}
          onCheck={handleCheck}
          onDelete={handleDelete}
          saveEditedTodo={saveEditedTodo}
        />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape),
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  saveEditedTodo: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
