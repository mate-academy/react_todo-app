import React from 'react';
import { TodoItem } from './TodoItem';
import { useContext } from 'react';
import { TodoContext } from './SetTodosContext';

export const TodoList: React.FC = () => {
  const todosContext = useContext(TodoContext);

  if (!todosContext) {
    return null;
  }

  const { filteredTodos } = todosContext;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
