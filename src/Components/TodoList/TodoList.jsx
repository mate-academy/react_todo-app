import React from 'react'
import { TodoItem } from '../TodoItem/TodoItem';

export function TodoList({ todos, setTodos}) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          setTodos={setTodos}
          todos={todos}
        />
      ))}
    </ul>
  )
}
