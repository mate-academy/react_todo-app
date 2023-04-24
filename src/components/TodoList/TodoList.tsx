import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[];
  handleUpdate: (id: number, data: boolean | string) => void;
  removeTodo: (id:number) => void;
};

export const TodoList: React.FC<Props> = ({
  items,
  handleUpdate,
  removeTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleUpdate={handleUpdate}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  );
};
