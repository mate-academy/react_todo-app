import React from 'react';
import { Todo } from './Todo';

export function TodoList({
  todos,
  setTodos,
}) {
  return (
    todos.map(elem => (
      <Todo key={elem.id} {...elem} setTodos={setTodos} />
    ))
  );
}
