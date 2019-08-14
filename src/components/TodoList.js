import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const TodoList = ({ todos, handleToggle, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        handleToggle={handleToggle}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  handleToggle: PropTypes.func,
  deleteTodo: PropTypes.func,
};

export default TodoList;
