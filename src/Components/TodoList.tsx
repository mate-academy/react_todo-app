import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodoContext } from '../TodoContext/TodoContext';

export const TodoList: React.FC = React.memo(() => {
  const { filteredTodos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
});

TodoList.displayName = 'TodoList';
