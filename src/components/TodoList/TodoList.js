import React from 'react';
import PropTypes, { shape } from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';
import { TodosFilter } from '../TodosFilter/TodosFilter';

import { TodoShapes } from '../../Shapes/TodoShapes';

export const TodoList = ({ todos, deleteTodo, completeTodo, location }) => {
  const { pathname } = location;

  return (
    <ul className="todo-list">
      {pathname === '/#'
        ? todos.map(todo => (
          <li className={todo.isCompleted ? 'completed' : ''} key={todo.id}>
            <TodoItem
              deleteTodo={deleteTodo}
              title={todo.title}
              id={todo.id}
              completeTodo={completeTodo}
              isCompleted={todo.isCompleted}
            />
          </li>
        ))
        : (
          <TodosFilter
            todos={todos}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            pathname={pathname}
          />
        )
      }

    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(shape(
    TodoShapes,
  )).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};
