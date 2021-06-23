import React, { useState, useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [todo, setTodo] = useState({
    title: '',
    completed: false,
    id: +new Date(),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTodos(prev => ([
          ...prev,
          { ...todo },
        ]));
        setTodo({
          title: '',
          completed: false,
          id: +new Date(),
        });
        localStorage.setItem('todos', JSON.stringify(todos));
      }}
    >
      <input
        value={todo.title}
        onChange={({ target }) => setTodo(prev => ({
          ...prev,
          title: target.value,
        }))}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
