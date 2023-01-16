import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[],
  handleDelete: (todoId: number) => void,
  handleEdit: (todoId: number, title: string) => void,
  handleComplete: (todoId: number) => void,
};

export const TodoList:React.FC<Props> = ({
  items, handleDelete, handleEdit, handleComplete,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem
          todo={item}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleComplete={handleComplete}
          key={item.id}
        />
      ))}
    </ul>
  );
};
