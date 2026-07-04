/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodoContext);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <section
      className="todoapp__main"
      data-cy="TodoList"
    >
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
