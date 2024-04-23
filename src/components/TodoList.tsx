import React, { useContext } from 'react';
import { Filter } from '../types/Filter';
import { TodoItem } from './TodoItem';
import { StateContext } from '../Store';

export const TodoList: React.FC = () => {
  const { todos, filterType } = useContext(StateContext);

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
