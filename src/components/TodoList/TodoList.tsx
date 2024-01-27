import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  items: Todo[];
  onDelete: (id: number) => void;
  onComplete: (selectedTodo: Todo) => void;
  updateTodo: (todo: Todo, newtitle: string) => void;
};

export const TodoList: React.FC<Props> = ({
  items,
  onDelete,
  onComplete,
  updateTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem
          todo={item}
          key={item.id}
          onDelete={onDelete}
          onComplete={onComplete}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};
