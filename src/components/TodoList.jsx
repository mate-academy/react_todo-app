import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  filteredTodos,
  deleteTodo,
  status,
  updateTitle,
}) => (

  <ul className="todo-list">
    {filteredTodos.map(todo => (
      <TodoItem
        todo={todo}
        deleteTodo={deleteTodo}
        status={status}
        updateTitle={updateTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  filteredTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};
