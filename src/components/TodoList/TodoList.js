import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  todos,
  changeStatus,
  deleteTodo,
  toggleAll,
  updateTodoItem,
}) => (
  <>
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
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
  changeStatus: PropTypes.func.isRequired,
  updateTodoItem: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isReuired,
      title: PropTypes.string.isReuired,
      completed: PropTypes.bool.isReuired,
    }).isRequired,
  ).isRequired,
};
