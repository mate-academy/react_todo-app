import React, { useContext, useMemo } from 'react';
import { TodosStateContext } from '../providers/TodosProvider';
import { TodoItem } from './TodoItem';
import { TodoStatus } from '../types/Todo';

export const TodoList = () => {
  const { state } = useContext(TodosStateContext);
  const { todos, filterByStatus } = state;

  const visibleTodos = useMemo(() => {
    switch (filterByStatus) {
      case TodoStatus.Active:
        return todos.filter(todo => !todo.completed);

      case TodoStatus.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filterByStatus, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
