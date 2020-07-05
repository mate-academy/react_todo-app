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
    {items.map((todo, index) => (
      (filter === 'all' || (filter === 'active' && !todo.completed)
        || (filter === 'completed' && todo.completed))
      && (
        <TodoItem
          key={todo.id}
          {...todo}
          todoIndex={index}
          handleStatusChange={() => {
            handleStatusChange(index);
          }}
          handleTitleChange={handleTitleChange}
          handleTodoRemove={() => {
            handleTodoRemove(index);
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
