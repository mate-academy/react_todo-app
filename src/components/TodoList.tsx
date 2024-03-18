import React, { useContext } from 'react';
import { TodosContext } from '../store/TodosContext';
import { TodoItem } from './TodoItem';
import { Status } from '../types/Status';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Status.ALL:
        return true;

      case Status.ACTIVE:
        return !todo.completed;

      case Status.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
