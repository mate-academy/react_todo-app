import React from 'react';
import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from './TodoContext';

export const TodoList: React.FC = () => {
  const { todos, dispatch } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} dispatch={dispatch} />
      ))}
    </section>
  );
};
