import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

function TodoList ({todos}) {


    let todoList = todos.map(todo => {
      return <TodoListItem todoListItem = {todo} />
    })
    return (
      <section className="main">
         <input type="checkbox" id="toggle-all" className="toggle-all" />
      <label htmlFor="toggle-all">Mark all as complete</label>
         <ul className="todo-list">
         { todoList }
         {/* deleteTodo = {deleteTodo} */}
         </ul>
      </section>
    )
  };


export default TodoList;
