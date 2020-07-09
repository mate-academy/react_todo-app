import React from 'react';

import { TodoItem } from '../TodoItem/TodoItem';

import { TodosFilterShapes } from '../../Shapes/Shapes';

export const TodosFilter = ({ todos, deleteTodo, completeTodo, pathname }) => {
  const isCompleted = pathname !== '/active';

  const filteredTodos = todos.filter(todo => todo.isCompleted === isCompleted);

  return (
    <>
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          deleteTodo={deleteTodo}
          title={todo.title}
          id={todo.id}
          completeTodo={completeTodo}
          isCompleted={todo.isCompleted}
        />
      ))}
    </>
  );
};

TodosFilter.propTypes = TodosFilterShapes;
