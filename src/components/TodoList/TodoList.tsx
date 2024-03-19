import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  items: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {
        items.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      }
    </ul>
  );
};
