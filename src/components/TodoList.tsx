import React from 'react';
import { TodoItem } from './TodoItem';
import { FilterTodos } from './FilterTodos';
import { useTodoContext } from '../context/TodosContext';

export const TodoList: React.FC = () => {
  const { orderItems, status } = useTodoContext();
  const visibleItems = FilterTodos(orderItems, status);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleItems.map(item => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </ul>
  );
};
