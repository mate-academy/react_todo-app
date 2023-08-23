import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo, Todos } from '../types/todoTypes';

interface Props {
  items: Todos;
  selectedFilter: string;
}

function FilteredItems(items: Todo[], selectedFilter: string) {
  let filteredItems;

  switch (selectedFilter) {
    case 'all':
      filteredItems = items;
      break;

    case 'active':
      filteredItems = items.filter(item => !item.completed);
      break;

    case 'completed':
      filteredItems = items.filter(item => item.completed);
      break;

    default:
      filteredItems = items;
      break;
  }

  return filteredItems;
}

export const TodoList: React.FC<Props> = ({ items, selectedFilter }) => {
  const filteredItems = FilteredItems(items, selectedFilter);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredItems.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </ul>
  );
};
