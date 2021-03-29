import React from 'react'
import { TodoItem } from '../TodoItem/TodoItem';

export function TodoList({ todos, handleChangeTodos}) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          handleChangeTodos={handleChangeTodos}
          todos={todos}
        />
      ))}
    </ul>
  )
}
