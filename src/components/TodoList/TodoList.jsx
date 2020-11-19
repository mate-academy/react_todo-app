import React from 'react';
import PropTypes from 'prop-types';
import { TodoShape } from '../../shapes/TodoShape';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  items,
  changeTodoStatus,
  deleteTodo,
  changeTodoTitle,
}) => (
  <ul className="todo-list">
    {items.map(item => (
      <TodoItem
        key={item.id}
        item={item}
        changeTodoStatus={changeTodoStatus}
        deleteTodo={deleteTodo}
        changeTodoTitle={changeTodoTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(TodoShape)),
  changeTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  items: [],
};
