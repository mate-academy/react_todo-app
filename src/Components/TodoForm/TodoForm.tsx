import React, { useState, useContext } from 'react';
// import { useLocalStorage } from '../../hooks/UseLocalStorege';

// import { Todo } from '../../Types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  // const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  // const { todos } = useContext(TodosContext);

  const resetForm = () => {
    setTitle('');
  };

  const addNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const newDateId = +new Date();

    const todo = {
      completed: false,
      id: newDateId,
      titleStorege: title,
    };

    if (!title.trim()) {
      return;
    }

    setTodos([...todos, todo]);
    resetForm();
  };

  return (
    <form onSubmit={addNewTodo}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};
