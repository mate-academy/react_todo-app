import React, { useContext, useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../contexts/TodoContext';
import { Todos } from '../types/Todos';

export const TodoList: React.FC = () => {
  const { todos, filterTodoByStatus, status } = useContext(TodoContext);
  const [visibleTodos, setVisibleTodos] = useState<Todos[]>([]);

  useEffect(() => {
    setVisibleTodos(filterTodoByStatus(todos, status));
  }, [todos, status]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} items={todo} />
      ))}
    </ul>
  );
};
