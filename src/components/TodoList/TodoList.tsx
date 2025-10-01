import React from 'react';

import { TodoItem } from '../TodoItem/TodoItem';
import { useTodos } from '../Сontext/TodosContext';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC<{ onDelete: (id: number) => void }> = ({
  onDelete,
}) => {
  const { todos, filter } = useTodos();

  const visibleTodos = todos.filter(todo =>
    filter === Filter.Active
      ? !todo.completed
      : filter === Filter.Completed
        ? todo.completed
        : true,
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </section>
  );
};
