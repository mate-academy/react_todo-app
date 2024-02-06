import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Status, useTodos } from '../../../Store';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Status.All:
        return true;
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  if (filteredTodos.length === 0) {
    return null;
  }

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
