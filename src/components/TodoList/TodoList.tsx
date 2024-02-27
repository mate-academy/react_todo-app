import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Values } from '../Types/Values';
import { Filtering } from '../CustomReducer/useCustomReducer';

interface Props {
  data: Values;
  activeFilter: Filtering;
}

export const TodoList: React.FC<Props> = ({ data, activeFilter }) => {
  const { filterItems } = data;

  return (
    <ul className="todo-list" data-cy="todosList">
      {filterItems(activeFilter).map(item => (
        <TodoItem key={item.id} item={item} data={data} />
      ))}
    </ul>
  );
};
