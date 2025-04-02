import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../TodoContext/TodoContext';

export const TodoList: React.FC = React.memo(() => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
});

TodoList.displayName = 'TodoList';
