import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo, Todos } from '../types/todoTypes';
import { Filter } from '../types/filterEnum';

interface Props {
  items: Todos;
  selectedFilter: string;
}

function filteredItems(items: Todo[], selectedFilter: string) {
  let updatedItems;

  switch (selectedFilter) {
    case Filter.All:
      updatedItems = items;
      break;

    case Filter.Active:
      updatedItems = items.filter(item => !item.completed);
      break;

    case Filter.Complited:
      updatedItems = items.filter(item => item.completed);
      break;

    default:
      updatedItems = items;
      break;
  }

  return updatedItems;
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
