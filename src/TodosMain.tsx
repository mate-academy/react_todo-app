import React, { memo } from 'react';
import { Task } from './Todo';
import { useTodos } from './hooks/useTodos';

export const TodosMain: React.FC = memo(() => {
  const { todos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Task todo={todo} key={todo.id} />
      ))}
    </section>
  );
});

TodosMain.displayName = 'TodosMain';
