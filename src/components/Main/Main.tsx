import React, { useContext } from 'react';
import { StateContext } from '../../context/StateContext';
import { Filter } from '../../types/Filter';
import { TodoItem } from '../TodoItem/TodoItem';

export const Main: React.FC = () => {
  const { todos, filterBy } = useContext(StateContext);

  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case Filter.active:
        return !todo.completed;
      case Filter.completed:
        return todo.completed;
      case Filter.all:
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
