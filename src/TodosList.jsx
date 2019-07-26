import React from 'react';

import TodoItem from './TodoItem';

const TodoList = ({ todos, handleTodoDelete }) => {
  return(
    <section className="main" style={{ display: 'block' }}>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
       {todos.map(todo =>
        (<TodoItem
          todo={todo}
          key={todo.id + 1}
          onHandleDelete={() => handleTodoDelete(todo.id)}
      />
      ))}
    </section>
    )
  }

export default TodoList;
