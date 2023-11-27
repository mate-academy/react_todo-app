import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../context/TodoContext';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      <ul className="todo-list" data-cy="todoList">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};
