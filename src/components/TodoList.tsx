import React from 'react';
import { useTodos } from '../context/TodosContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
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
