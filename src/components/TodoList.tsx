import React, { useMemo } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { TodoStatus } from '../types/Todo';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos, selectedStatus } = useTodoContext();

  const visibleTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        switch (selectedStatus) {
          case TodoStatus.Active:
            return !todo.completed;
          case TodoStatus.Completed:
            return todo.completed;
          default:
            return todo;
        }
      });
  }, [selectedStatus, todos]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos
        .map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
    </ul>
  );
};

export default TodoList;
