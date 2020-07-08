import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';

import { TodoShapes } from '../../Shapes/TodoShapes';

export const TodosFilter = ({ todos, deleteTodo, completeTodo, pathname }) => {
  const isCompleted = pathname !== '/#active';

  const filteredTodos = todos.filter(todo => todo.isCompleted === isCompleted);

  return (
    <>
      {filteredTodos.map(todo => (
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
    </>
  );
};

TodosFilter.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(
    TodoShapes,
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};
