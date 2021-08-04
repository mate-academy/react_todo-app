import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, setTodos }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <React.Fragment key={todo.id}>
          <TodoItem todo={todo} setTodos={setTodos} />
        </React.Fragment>
      ))}
    </ul>
  );
};
