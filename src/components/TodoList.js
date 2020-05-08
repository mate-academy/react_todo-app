import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  items,
  onStatusToggle,
  onDeleteTodo,
  onEditTodo,
}) => (
  <ul className="todo-list">
    {items.map(({ id, title, completed }) => (
      <TodoItem
        key={id}
        title={title}
        itemId={id}
        completed={completed}
        statusToggle={onStatusToggle}
        deleteTodo={onDeleteTodo}
        editTodo={onEditTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onStatusToggle: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};
