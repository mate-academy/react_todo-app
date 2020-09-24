import React from 'react';
import { Todo, InTodo } from './Todo';

interface InTodoListData {
  todos: InTodo[];
  setTodos: (x: InTodo[]) => void;
}
export function TodoList({
  todos,
  setTodos,
}: InTodoListData) {
  return (
    <>
      {todos.map((elem: InTodo) => (
        <Todo
          key={elem.id}
          {...elem}
          setTodos={setTodos}
          todos={todos}
        />
      ))}
    </>
  );
}
