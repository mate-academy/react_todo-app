import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { TodoItem } from './TodoItem';
import { FilterType, Filter } from '../types/Filter';

interface Props {
  filter: FilterType;
}

export const TodoList: React.FC<Props> = ({ filter }) => {
  const { todos } = useContext(TodoContext);

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.ACTIVE) return !todo.completed;
    if (filter === Filter.COMPLETED) return todo.completed;
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
