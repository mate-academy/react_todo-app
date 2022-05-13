/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';

const TodoList = () => {
  const todos = JSON.parse(localStorage.getItem('todo')) || [];
  const [up, setUp] = useState({});

  const deleting = (todoForDeleting) => {
    const newTodos = todos.filter(todo => (JSON.parse(todo).id !== todoForDeleting.id));

    localStorage.setItem('todo', JSON.stringify(newTodos));
    setUp(newTodos);
  };

  useEffect(() => {

  }, [up]);

  return (
    <ul className="todo-list">
      {todos.map((item) => {
        const todo = JSON.parse(item);

        return <TodoItem deleteTODO={deleting} todo={todo} key={todo.id} />;
      })}
    </ul>
  );
};

export default TodoList;
