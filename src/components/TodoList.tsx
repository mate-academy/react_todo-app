import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { FilterContext } from '../FilterContext';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(FilterContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
