import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, updateTodos }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <React.Fragment key={todo.id}>
          <TodoItem todo={todo} updateTodos={updateTodos} />
        </React.Fragment>
      ))}

      {/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" />
          <label>qwertyuio</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li> */}
      {/* <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" />
          <label>zxcvbnm</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </ul>
  )
}
