import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../../contexts/TodoContext';
import { TODO_FILTER_STATUS } from '../../types/TodoFilterStatus';

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useContext(TodoContext);

  const visibleTodos = todos.filter(todo => {
    switch (filterStatus) {
      case TODO_FILTER_STATUS.ACTIVE:
        return !todo.completed;

      case TODO_FILTER_STATUS.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    todos.length > 0 && (
      <section className="todoapp__main" data-cy="TodoList">
        {/* This is a completed todo */}
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </section>
    )
  );
};
