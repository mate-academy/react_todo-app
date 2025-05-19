import React, { useMemo } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { state } = useTodoContext();

  const { todos, filter } = state;

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
