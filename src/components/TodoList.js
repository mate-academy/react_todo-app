import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = props => {
  const { todos } = props;
  return (
    <ul className="todo-list">
      {todos.map(todo => {
        return <TodoListItem todo={todo} key={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
