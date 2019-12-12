import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Todo = ({ todo, deleteTodo, checkTodo }) => (
  <li className={cn({ completed: todo.completed })}>
    <div className={cn('view')}>
      <input
        checked={todo.completed}
        onChange={e => checkTodo(e, todo.id)}
        type="checkbox"
        className={cn('toggle')}
        id={todo.id}
      />
      <label htmlFor="todo-1">{todo.title}</label>
      <button
        onClick={() => deleteTodo(todo.id)}
        type="button"
        className={cn('destroy')}
      />
    </div>
  </li>
);

Todo.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
};

export default Todo;
