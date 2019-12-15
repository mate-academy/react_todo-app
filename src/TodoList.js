import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, markTodoCompleted, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo.id} className={todo.completed ? 'completed' : ''}>
        <TodoItem
          todo={todo}
          markTodoCompleted={markTodoCompleted}
          deleteTodo={deleteTodo}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  markTodoCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
