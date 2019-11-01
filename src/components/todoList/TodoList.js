import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todoItem/TodoItem';

const TodoList = ({
  todos,
  handleStatusClick,
  deleteClick,
  handleEdit,
}) => (
  <ul className="todo-list">
    {todos.map(({ title, completed, id }) => (
      <TodoItem
        todoTitle={title}
        todos={todos}
        id={id}
        key={id}
        handleStatusClick={handleStatusClick}
        status={completed}
        handleEdit={handleEdit}
        deleteClick={deleteClick}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.string,
  })).isRequired,
  handleStatusClick: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default TodoList;
