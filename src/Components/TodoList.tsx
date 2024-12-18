import React from 'react';
import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, dispatch } = useContext(TodoContext);

  return (
    <>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </>
  );
};
