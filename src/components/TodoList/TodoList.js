import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TodoItem } from '../TodoItem';

const TodoList = (props) => {
  const { todos, location } = props;

  let todosToShow = todos;

  if (location.pathname === '/completed') {
    todosToShow = todos.filter(todo => todo.isCompleted);
  }

  if (location.pathname === '/active') {
    todosToShow = todos.filter(todo => !todo.isCompleted);
  }

  return (
    <ul className="todo-list">
      {
        todosToShow.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            isCompleted={todo.isCompleted}
            title={todo.title}
          />
        ))
      }
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export const TodoListWithRouter = withRouter(TodoList);
