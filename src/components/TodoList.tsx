import React, { useContext, useMemo } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from './TodoContext';
import { Status } from '../types/Status';

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useContext(TodoContext);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterStatus) {
        case Status.All:
          return true;

        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;
      }
    });
  }, [filterStatus, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
