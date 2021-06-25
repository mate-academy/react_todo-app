import React, { useState, useContext, useCallback } from 'react';
import { TodosContext } from '../TodosContext';

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [todo, setTodo] = useState({
    title: '',
    completed: false,
    id: +new Date(),
  });

  const onAddTodo = useCallback((e) => {
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
  }, [todo]);

  const handleChange = useCallback(({ target }) => setTodo(prev => ({
    ...prev,
    title: target.value,
  })), []);

  return (
    <form
      onSubmit={onAddTodo}
    >
      <input
        value={todo.title}
        onChange={handleChange}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
