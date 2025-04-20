import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../context/TodoContext';
import { TodoContextType } from '../types/Action';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodoContext) as TodoContextType;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
