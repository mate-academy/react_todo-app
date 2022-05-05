import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
