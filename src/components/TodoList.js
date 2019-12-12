import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, isCompleted, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map((todo, i) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        i={i}
        isCompleted={isCompleted}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
