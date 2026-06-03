import React from 'react';
import { useTodo } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem';
import { FILTERS } from '../../utils/filters';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodo();

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.active:
        return !todo.completed;
      case FILTERS.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
