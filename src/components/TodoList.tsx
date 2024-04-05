import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { FilterTodos } from './FilterTodos';
import { TodoContext } from '../context/TodosContext';

export const TodoList: React.FC = () => {
  const { orderItems, status } = useContext(TodoContext);
  const visibleItems = FilterTodos(orderItems, status);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleItems.map(item => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </ul>
  );
};
