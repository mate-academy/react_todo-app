import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = props => {
  const { deleteTodo, toggleTodo, todos } = props;
  return (
    <ul className="todo-list">
      {todos.map(todo => {
        return <TodoListItem todo={todo} key={todo.id} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />;
      })}
    </ul>
  );
};

export default TodoList;
