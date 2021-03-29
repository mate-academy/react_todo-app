import React, { FormEvent, useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');

  const createTodo = () => ({
    id: +new Date(),
    title: newTodo,
    completed: false,
  });

  const addNewTodo = (event: FormEvent) => {
    event.preventDefault();

    if (!newTodo.length) {
      return;
    }

    const todo = createTodo();

    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  return (
    <form onSubmit={addNewTodo}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
    </form>
  );
};
