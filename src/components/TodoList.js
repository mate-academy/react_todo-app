import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  todosList,
  handleTodoStatus,
  handleDeleteTodo,
  handleDoubleClickEditTitle,
}) => (
  <ul className="todo-list">
    {todosList.length
      ? todosList
        .map(({ title, completed, id }) => (
          <TodoItem
            key={id}
            todosList={todosList}
            todoTitle={title}
            todoStatus={completed}
            todoId={id}
            handleTodoStatus={handleTodoStatus}
            handleDeleteTodo={handleDeleteTodo}
            handleDoubleClickEditTitle={handleDoubleClickEditTitle}
          />
        ))
      : null
    }
  </ul>
);

TodoList.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  handleTodoStatus: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleDoubleClickEditTitle: PropTypes.func.isRequired,
};
