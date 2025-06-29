import React from 'react';
import { useTodos } from '../TodoContext';
import { StatusFilter } from '../types';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  const filteredTodos = todos.filter(todo => {
    if (filter === StatusFilter.Active) {
      return !todo.completed;
    }

    if (filter === StatusFilter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
