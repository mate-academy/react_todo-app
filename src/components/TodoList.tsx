import React, { useContext, useMemo } from 'react';
import { TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';
import { Status } from '../types';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
