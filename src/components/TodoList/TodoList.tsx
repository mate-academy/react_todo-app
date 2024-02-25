import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../CustomReducer/useCustomReducer';

interface Props {
  data: Todo[];
}

export const TodoList: React.FC<Props> = ({ data }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {data.map(item => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
