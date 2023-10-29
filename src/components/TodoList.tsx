import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(TodoContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
