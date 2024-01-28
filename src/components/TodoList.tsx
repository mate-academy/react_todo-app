import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../TodosContext.tsx/TodosContext';

interface TodoListInterface {
  items: Todo[],
}

export const TodoList: React.FC<TodoListInterface> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => <TodoItem todo={item} key={item.id} />)}
    </ul>
  );
};
