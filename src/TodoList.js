import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, checkTodo }) => (
  <ul className={cn('todo-list')}>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
        checkTodo={checkTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
};

export default TodoList;
