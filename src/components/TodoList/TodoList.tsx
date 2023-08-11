import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../Types/Todo';

type Props = {
  items: Todo[]
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(todo => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          todo={todo}
        />
      ))}
    </ul>
  );
};
