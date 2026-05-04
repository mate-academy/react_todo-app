import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { VisibleTodosContext } from '../../TodosContext/Context';

export const TodoAppList: React.FC = () => {
  const todos = useContext(VisibleTodosContext).visibleTodos;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
