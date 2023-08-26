import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo, Todos } from '../types/todoTypes';
import { Filter } from '../types/enum';

interface Props {
  items: Todos;
  selectedFilter: string;
}

function filteredItems(items: Todo[], selectedFilter: string) {
  switch (selectedFilter) {
    case Filter.Active:
      return items.filter(item => !item.completed);
    case Filter.Complited:
      return items.filter(item => item.completed);
    default:
      return items;
  }
}

export const TodoList: React.FC<Props> = ({ items, selectedFilter }) => {
  const updatedItems = filteredItems(items, selectedFilter);

  return (
    <ul className="todo-list" data-cy="todosList">
      {updatedItems.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </ul>
  );
};
