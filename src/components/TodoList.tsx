import React from 'react';

import { Filter } from '../enums/Filter';
import { useTodoContext } from '../hooks/useTodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const {
    state: { todos, filter },
  } = useTodoContext();

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
