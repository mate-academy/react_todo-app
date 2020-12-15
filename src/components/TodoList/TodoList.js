import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  todos,
  changeStatus,
  deleteTodo,
  updateTodoItem,
  filterStatus,
}) => (
  <>
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          filterStatus={filterStatus}
          changeStatus={changeStatus}
          key={todo.id}
          deleteTodo={deleteTodo}
          updateTodoItem={updateTodoItem}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
  updateTodoItem: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isReuired,
      title: PropTypes.string.isReuired,
      completed: PropTypes.bool.isReuired,
    }).isRequired,
  ).isRequired,
};
