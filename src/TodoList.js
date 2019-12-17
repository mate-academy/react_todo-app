import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, changeTodoStatus, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        changeTodoStatus={changeTodoStatus}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
