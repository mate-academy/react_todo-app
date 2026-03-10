import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { TodoItem } from './TodoItem';

interface Props {
  filter: 'all' | 'active' | 'completed';
}

export const TodoList: React.FC<Props> = ({ filter }) => {
  const { todos } = useContext(TodoContext);

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
