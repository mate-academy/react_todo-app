import React from 'react';
import { TodoItem } from '../TodoItem';
import { ListFooter } from '../ListFooter';
import { useTodos } from '../../context/TodosContext';

export const TodoList: React.FC = () => {
  const { filteredTodos, todos } = useTodos();

  if (todos.length === 0) {
    return <section className="todoapp__main" data-cy="TodoList" />;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <ListFooter />
    </section>
  );
};
