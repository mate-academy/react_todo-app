import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';
import { todoShape } from '../../shapes/todoShape';

export const TodoList = ({
  items,
  handleStatusChange,
  handleTitleChange,
  handleTodoRemove,
  filter,
}) => (
  <ul className="todo-list">
    {items.map(todo => (
      (filter === 'all' || (filter === 'active' && !todo.completed)
        || (filter === 'completed' && todo.completed))
      && (
        <TodoItem
          key={todo.id}
          {...todo}
          handleStatusChange={() => {
            handleStatusChange(todo.id);
          }}
          handleTitleChange={handleTitleChange}
          handleTodoRemove={() => {
            handleTodoRemove(todo.id);
          }}
        />
      )
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(todoShape).isRequired,
  filter: PropTypes.string.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleTodoRemove: PropTypes.func.isRequired,
};
