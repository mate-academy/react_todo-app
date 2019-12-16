/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TodoItem from './TodoItem';

const TodoList = ({
  items,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  handleKeyPress,
  setEditedValue,
}) => (
  <ul className={cn('todo-list')}>
    {items.map(item => (
      <TodoItem
        key={item.id}
        todo={item}
        onToggle={() => onToggleTodo(item.id)}
        onDelete={() => onDeleteTodo(item.id)}
        onEdit={() => onEditTodo(item.id)}
        handleKeyPress={handleKeyPress}
        setEditedValue={setEditedValue}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  setEditedValue: PropTypes.func.isRequired,
};

export default TodoList;
