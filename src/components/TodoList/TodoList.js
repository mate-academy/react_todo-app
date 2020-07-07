import React from 'react';
import PropTypes, { shape } from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';

import { TodoShapes } from '../../Shapes/TodoShapes';

export const TodoList = ({ todos, deleteTodo, completeTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className={todo.isCompleted ? 'completed' : ''} key={todo.id}>
        <TodoItem
          deleteTodo={deleteTodo}
          title={todo.title}
          id={todo.id}
          completeTodo={completeTodo}
          isCompleted={todo.isCompleted}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(shape(
    TodoShapes,
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};
