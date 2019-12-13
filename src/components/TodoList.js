import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TodoItem from './TodoItem';

const TodoList = ({ items, onToggleTodo, onDeleteTodo }) => (
  <ul className={cn('todo-list')}>
    {items.map(item => (
      <TodoItem
        key={item.id}
        todo={item}
        onToggle={() => onToggleTodo(item.id)}
        onDelete={() => onDeleteTodo(item.id)}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
