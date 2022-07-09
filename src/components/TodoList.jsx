import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = React.memo(({
  todos,
  setTodos,
}) => (
  <ul className="todo-list" data-cy="todosList">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        setTodos={setTodos}
        todos={todos}
      />
    ))}
  </ul>
));
