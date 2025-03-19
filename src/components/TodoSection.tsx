import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodoContext } from '../TodoContext';

export const TodoSection: React.FC = () => {
  const { tempTodo, filteredTodos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
      {tempTodo && <TodoItem todo={tempTodo} key={tempTodo.id} loading />}
    </section>
  );
};
